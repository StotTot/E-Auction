export class Bid {
    constructor(
        public buyerFName?:string,
        public buyerLName?:string,
        public buyerAdd?:string,
        public buyerCity?:string,
        public startPrice?:number,
        public buyerState?:string,
        public buyerPhone?:number,
        public buyerPin?:number,
        public buyerEmail?:string,
        public prodId?:string,
        public bidAmount?:number
    ){}
}