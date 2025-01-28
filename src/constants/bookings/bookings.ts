export interface IBookingsSchema {
  userObjectId: string;
  resortObjectId: string;
  roomObjectId: string;
  activityObjectIds: string;
  user_name: string;
  user_phone: string;
  user_mail: string;
  checkInDate: Date;
  checkOutDate: Date;
  totalPrice: number;
  status: string;
}
