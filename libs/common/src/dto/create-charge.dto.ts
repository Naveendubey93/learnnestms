import { Type } from "class-transformer";
import { CardDto } from "./card.dto";
import { IsDefined, IsNotEmptyObject, IsNumber, ValidateNested } from "class-validator";
export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @Type(()=>CardDto)
  @ValidateNested()
  card: CardDto;

  @IsNumber()
  amount: number
}