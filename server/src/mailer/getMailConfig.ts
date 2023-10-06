import { ConfigService } from '@nestjs/config';

export const getMailConfig = async (
	configService: ConfigService,
): Promise<any> => {
	return {
		transport: {
			host: configService.get('MAILER_SERVER'),
			secure: false,
			port: configService.get('MAILER_PORT'),
			auth: {
				user: configService.get('MAILER_USER'),
				pass: configService.get('MAILER_PASSOWRD'),
			},
			tls: {
				rejectUnauthorized: false,
			},
		},
	};
};
