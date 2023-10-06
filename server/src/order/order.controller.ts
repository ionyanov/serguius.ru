import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OdrerDto } from './order.dto';

@Controller('makeorder')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	public async onUpload(@Body() body: OdrerDto) {
		this.orderService.makeorder(body);
	}
}
