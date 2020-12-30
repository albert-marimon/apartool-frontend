export class User{
	constructor(
        public firstname: string,
        public lastname: string,
		public email: string,
        public password: string,
        public phone_number: string,
        public default_lang: string,
        public active: number
	){}
}