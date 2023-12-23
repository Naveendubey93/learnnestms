import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ClientProxy } from '@nestjs/microservices';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  // async create(createReservationDto: CreateReservationDto, userId: string) {
  //   this.paymentsService.send('create_charge', createReservationDto.charge)
  //   .subscribe(async (response) => {
  //    console.log({response});
  //     const reservation = this.reservationsRepository.create({
  //       ...createReservationDto,
  //       timestamp: new Date(),
  //       userId,
  //     });
  //     return reservation;
  //   //  console.log({reservation})
  //   });
    
  //   // _id: '_12assignment',
  //   // } as Omit<TDocument, '_id'>);
  // }
  async create(
    createReservationDto: CreateReservationDto, userId: string
    // { email, _id: userId }: UserDto, 
  ) {
    return this.paymentsService
      .send('create_charge', {
        ...createReservationDto.charge,
        timestamp: new Date(),
        userId,
      })
      .pipe(
        map((res) => {
          return this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            timestamp: new Date(),
            userId,
          });
        }),
      );
  }
  async findAll() {
    return this.reservationsRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
