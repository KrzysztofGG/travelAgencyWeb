
export class Trip {
    _id: string;
    name: string;
    country: string;
    dateStart: Date;
    dateEnd: Date;
    price: number;
    maxPlaces: number;
    availablePlaces: number;
    description: string;
    imageSources: string[];
    ratings: number[];
    reviews: TripReview[];
    
    constructor(_id: string, name: string, country: string, dateStart: Date, dateEnd: Date,
        price: number, maxPlaces: number, description: string, imageSources: string[]){
            this._id = _id;
            this.name = name;
            this.country = country;
            this.dateStart = dateStart;
            this.dateEnd = dateEnd;
            this.price = price;
            this.maxPlaces = maxPlaces;
            this.availablePlaces = maxPlaces;
            this.description = description;
            this.imageSources = imageSources;
            this.ratings = [];
            this.reviews = [];
        }
}

export interface TripReview {
    author: string,
    rating: number,
    comment: string,
    date?: string
}
