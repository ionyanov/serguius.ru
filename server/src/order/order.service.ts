import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { OdrerDto } from './order.dto';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class OrderService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly logger: LogService,
		private readonly user: UserService,
		private readonly mailer: MailerService,
		private readonly settings: SettingsService,
	) {}

	async makeorder(body: OdrerDto) {
		let result;
		try {
			const user = await this.user.getUserByEmail(body.email);
			if (!user)
				this.user.create(body.email, process.env.PASSWORD_DEFAULT);
			result = await this.mailer
				.sendMail({
					to: await this.settings.get('Email'),
					from: process.env.MAILER_USER,
					replyTo: body.email,
					subject: await this.settings.get('Order subject'),
					html: body.text,
					text: body.text.replaceAll(/<[^>]+>/g, ''),
				})
				.catch(e => {
					console.log(e);
					return e;
				});
		} catch (e) {
			this.logger.LogMessage(e, 'Error send email!');
		}
		return result;
	}
}
