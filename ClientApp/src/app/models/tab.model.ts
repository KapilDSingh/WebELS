import { LMP } from './IsoModels';

/** Represent Tab class */
export class Tab {
  messageHistory: LMP[];
  heading: string;
  title: string;

  constructor(
    heading: string='',
    title:string=''
  ) {
    this.heading = heading;
    this.title = title;
    this.messageHistory = [];
  }
}
