import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DuegevPrivilegeProviderService {

    constructor() { }

    getMyPrivileges(): Observable<string[]> {
        /* 
        TODO:
        create endpoint where loggedInUser logs in and endpoint returns the 
        correct privileges -> this FN should return an Observable
        */
        let response = new BehaviorSubject<string[]>(['sudo']);
        return response;
    }
}

export const DuegevAccountPrivileges = [
    'sudo',         /* has access to everything */
    'recruiter',    /* has access to adding users */
]





