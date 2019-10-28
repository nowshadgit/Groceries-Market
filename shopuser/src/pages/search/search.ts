import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ItemsesPage } from '../itemses/itemses';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {


  public itemsName:string;
  searchQuery: string = '';
  items: string[];
  username: string;
  public address: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.username=this.navParams.get('id1');
    this.address=this.navParams.get('id2');
    this.initializeItems();
  }

  initializeItems() {
    this.items = [
      'Rice & Rice Products',
      'Atta, Flours & Sooji',
      'Dals & Pulses',
      'Salt, Sugar * Jaggery',
      'Edible Oils & Ghee',
      'Organic Stables',
      'Dry Fruits',
      'RMasalas & Spices',
      'Fresh Vegetables',
      'Fresh Herbs & Seasonings',
      'Cuts & Sprouts',
      'International Fruits And Vegetables',
      'Organic Fruits & Vegetables',
      'Flowers',
      'Vegetables',
      'All Beverages',
      'Mineral Water',
      'Energy & Health Drinks',
      'Soft Drinks',
      'Tea & Coffee',
      'Fruit Drinks & Juices',
      'Ayurvedic',
      'Organic Beverages',
      'Cookies, Rusk & Kari',
      'Gourmet Breads',
      'Cakes & Prastries',
      'Ice Creams & Desserts',
      'Breakfast Cereals',
      'Noodles',
      'Biscuits',
      'Jams & Spreads',
      'Pasta & Veermicelli',
      'Veg Snacks',
      'Sauces & Ketchup',
      'Chocolates & Sweets',
      'Ready To Eat & Cook',
      'Banking & Dessert items',
      'Indian Sweets',
      'Canned Food',
      'Picklets',
      'Ayurvedic Food',
      'Health & Nutrition',
      'Feminine Hygiene',
      'Oral Care',
      'Bath, Face & Hand Wash',
      'Hair Care',
      'Health & Medicine',
      'Skin Care',
      'Mens Grooming',
      'Makeup',
      'Deodorant & Fragrance',
      'Kitchen & Dining',
      'Detergents',
      'Utesil Cleaners',
      'Toilets, Floor & Other Cleaners',
      'Disposables, Garbage Bag',
      'Repellents & Freshners',
      'Plasticware',
      'Cleaning Accessories',
      'Pet Care',
      'Shoe Care',
      'Cookware',
      'Pooja Needs',
      'Electricals',
      'Kitchen Tools',
      'Car & Shoe Care',
      'Serveware',
      'Gardening Needs',
      'Back To School',
      'Utilities',
      'Gifting',
      'Safty Accessories',
      'Car Care',
      'Kitchen Ware',
      'Other Accessories',
      'Crackers',
      'Party & Festival Needs',
      'Feminine Hygiene',
      'Raincoat',
      'Oils & Vinegar',
      'Dairy & Cheese',
      'Snacks, Dry Fruits, Nuts',
      'Pasta, Soup & Noodles',
      'Sauce, Spreads & Dips',
      'Chocolates & Biscuits',
      'Drinks & Beverages',
      'Cereals & Breakfast',
      'Tinned & processed Food',
      'Eggs',
      'Marinates',
      'Poultry',
      'Fish & Seafood',
      'Mutton & Lamb',
      'Baby Food & Formula',
      'Baby Diapers & Wipes'

    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  itemse(country: string){
    console.log(country);
      this.navCtrl.push(ItemsesPage,{
      'value3':country,
      'value4':this.username,
      'address':this.address
    });

  }
}
