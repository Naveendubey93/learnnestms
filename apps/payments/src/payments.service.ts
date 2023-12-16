import { CreateChargeDto } from '../../../libs/common/src/dto/create-charge.dto';
import { Injectable } from '@nestjs/common';
import {  ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );
  constructor(private readonly configService: ConfigService) {}

  async createCharge({card, amount}: CreateChargeDto) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });
    const paymentintent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
    console.log("Request received:", paymentintent);
    return paymentintent;
  }
}
