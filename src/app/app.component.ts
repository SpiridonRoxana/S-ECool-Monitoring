import { Component, ElementRef, AfterViewInit, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { loadPlayer, Player } from 'rtsp-relay/browser';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {

  player?: Player;
  showLoading: boolean = true;


  @ViewChild('videoPlayer')
  videoPlayer?: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {

    if (this.videoPlayer)
      this.videoPlayer.nativeElement.style.display = "none";

    loadPlayer({
      url: 'ws://localhost:2000/api/stream',
      canvas: this.videoPlayer!.nativeElement,
      onDisconnect: () => {
        if (this.videoPlayer)
          this.videoPlayer.nativeElement.style.display = "inline-block";
      },
    }).then(res => {
      this.player = res
      this.showLoading = false;
      console.log('Connected!', this.player);
    }).catch((e) => console.log("Error during connection", e));

  }
}