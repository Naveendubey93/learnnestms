import { NOTIFICATIONS_SERVICE, CreateChargeDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import {  ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
     apiVersion: '2023-10-16',
    },
  );
  constructor(private readonly configService: ConfigService,
     @Inject(NOTIFICATIONS_SERVICE)
     private readonly notificationService: ClientProxy) {}

//   async createCharge({card, amount}: CreateChargeDto) {
//     const paymentMethod = await this.stripe.paymentMethods.create({
//       type: 'card',
//       card,
//     });
//     const paymentintent = await this.stripe.paymentIntents.create({
//       payment_method: paymentMethod.id,
//       amount: amount,
//       confirm: true,
//       payment_method_types: ['card'],
//       currency: 'usd',
//     }); 
//     console.log("Request received:", paymentintent);
//     return paymentintent;
//   }
async createCharge({card, amount, email }: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
    this.notificationService.emit('notify_email', { email, text: `Your payment of $${amount*100} has completed sucessfuly`});
    return paymentIntent;
  }
}
