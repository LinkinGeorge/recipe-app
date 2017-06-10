import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FavoritesProvider {
  favorites = [];

  constructor(public storage: Storage) {
    this.getFavorites().then((favs) => {
      if (favs == null) {
        this.favorites = [];
      } else {
        this.favorites = favs;
      }
    });
  }

  addFavorite(id:string) {
    if (this.favorites.indexOf(id) === -1) {
      this.favorites.push(id);
    }
    return this.storage.set('favorites', this.favorites);
  }

  removeFavorite(id:string) {
    if (this.favorites.indexOf(id) !== -1) {
      this.favorites.splice(this.favorites.indexOf(id), 1);
    }
    return this.storage.set('favorites', this.favorites);
  }

  getFavorites() {
    return this.storage.get('favorites');
  }

  isFavorite(id:string):boolean {
    if (this.favorites.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

}
