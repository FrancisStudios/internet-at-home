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
        let response = new BehaviorSubject<string[]>(['sudo', 'cartographer']);
        return response;
    }
}

export const DuegevAccountPrivileges = [
    'sudo',         /* has access to everything */
    'recruiter',    /* has access to adding users */
    'default',      /* read, write, like, manage new year, social */
    'cartographer', /* upload and edit maps */ 
]





