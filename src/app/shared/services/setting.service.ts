import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Setting } from '../models/Setting';

let URL_SETTING = "http://localhost:3000/api/setting"

@Injectable({
    providedIn: 'root'
})
export class SettingService {
    private setting: Setting;
    private settingUpdated = new Subject<{
        paginator: number,
        score: number,
        admis: number
    }>();
    constructor(private http: HttpClient, private router: Router) {}

    getSettings(){
        this.http.get<{setting: Setting}>(URL_SETTING).subscribe((settingData) => {
            this.setting = settingData.setting;
            this.settingUpdated.next({
                paginator: this.setting.paginator,
                score: this.setting.score,
                admis: this.setting.admis
            })
        })
    }

    getSettingUpdateListener() {
        return this.settingUpdated.asObservable();
      }

    changeSetting(paginator: number, score: number, admis: number) {
        let setting = {
            paginator: paginator,
            score: score,
            admis: admis
        }
        return this.http.put<{message: string}>(URL_SETTING, setting);
    }
}