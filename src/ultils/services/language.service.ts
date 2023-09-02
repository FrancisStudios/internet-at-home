import { Injectable } from '@angular/core';
import { SessionStorageItems } from 'src/data-types/authentication/session-storage-items';
import { UserData } from 'src/data-types/authentication/user-data';
import { DynariLanguageModel } from './languages/dynari.language';
import { EnglishLanguageModel } from './languages/english.language';

@Injectable({
    providedIn: 'root',
})
export class InternetAtHomeLanguageService {
    selectedLanguageModel: any;

    constructor() { }

    private getFromLUTDictionary(R_ID: string): string {
        return this.selectedLanguageModel[R_ID];
    }

    getString(RESOURCE_IDENTIFIER: string): string {
        let loggedInUser: UserData = JSON.parse(sessionStorage.getItem(SessionStorageItems.USER) as string);
        let lingoPreference;

        loggedInUser ? lingoPreference = loggedInUser.language : lingoPreference = 'English';

        switch (lingoPreference) {
            case 'English':
                this.selectedLanguageModel = EnglishLanguageModel;
                break;

            case 'Dynari':
                this.selectedLanguageModel = DynariLanguageModel;
                break;
        }

        return this.getFromLUTDictionary(RESOURCE_IDENTIFIER);
    }
}