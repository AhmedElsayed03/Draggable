import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent ,CommonModule  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'drag';



  getdata(){
     var x = document.getElementById("p1");
     if(x){
      // const nodeList = x.childNodes;
      // let text = "";
      // for (let i = 0; i < nodeList.length; i++) {
      //     text += nodeList[i].nodeName + "<br>";
      //   }
      //       console.log(text)'
      console.log(x.nextElementSibling?.innerHTML)
     }

        
  }

}


