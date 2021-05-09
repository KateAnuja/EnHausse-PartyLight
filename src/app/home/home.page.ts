import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRange, IonRouterOutlet, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Flashlight } from '@ionic-native/flashlight/ngx';
const { App } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  isPartyLightOpen : boolean = false;
  flashInterval : number = 2000;
  flashLightIntervalFn:any;
  isFlashlight : boolean = false;
  @ViewChild("range",{static:false}) range : IonRange;
  constructor(
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private flashlight: Flashlight,
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        this.flashlight.switchOff();
        App.exitApp();
      }
    });
  }

  ngOnInit() {
      this.pulse();
    
  }

  getRangeValue(event){
    let rangeValue= event.target.value;
    this.flashInterval =5000 - ( ((rangeValue/100)*4000)+1000);
    
  }


  pulse(){
    if(this.isFlashlight){
      this.flashlight.switchOn().then(()=>{
        setTimeout(async ()=>{
          this.flashlight.switchOff().then(()=>{
            setTimeout(()=>{
              this.pulse();
            },this.flashInterval);
          })
        },500-((4000-this.flashInterval)/10));
      });
    }
    
  }

  getFlashlightState(event){
    console.log("flashligh", event.target.checked);
    if(event.target.checked){
      this.isFlashlight = true;
      this.pulse();
    }else{
      this.isFlashlight = false;
    }
  }

}
