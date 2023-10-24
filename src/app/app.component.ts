import { Component } from '@angular/core';
import { data } from './data.models';
import { comment } from './comment.models';

import { formatFecha } from './formatFecha.models';
import { AfterViewInit,OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit,OnInit{
  title = 'Frontend Mentor | Interactive comments section';
  data:data={
    "currentUser":{
      "image": {
        "png": "../assets/images/avatars/image-juliusomo.png",
        "webp": "../assets/images/avatars/image-juliusomo.webp"
      },
      "username": "juliusomo"
    },
    "comments":[]
    // [
    //   {
    //     "id": 1,
    //     "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    //     "createdAt": "1 month ago",
    //     "score": 12,
    //     "user": {
    //       "image": {
    //         "png": "../assets/images/avatars/image-amyrobson.png",
    //         "webp": "../assets/images/avatars/image-amyrobson.webp"
    //       },
    //       "username": "amyrobson"
    //     },
    //     "replies": []
    //   },
    //   {
    //     "id": 2,
    //     "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    //     "createdAt": "2 weeks ago",
    //     "score": 5,
    //     "user": {
    //       "image": {
    //         "png": "../assets/images/avatars/image-maxblagun.png",
    //         "webp": "../assets/images/avatars/image-maxblagun.webp"
    //       },
    //       "username": "maxblagun"
    //     },
    //     "replies": [
    //       {
    //         "id": 3,
    //         "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
    //         "createdAt": "1 week ago",
    //         "score": 4,
    //         "replyingTo": "maxblagun",
    //         "user": {
    //           "image": {
    //             "png": "./images/avatars/image-ramsesmiron.png",
    //             "webp": "./images/avatars/image-ramsesmiron.webp"
    //           },
    //           "username": "ramsesmiron"
    //         }
    //       },
    //       {
    //         "id": 4,
    //         "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
    //         "createdAt": "2 days ago",
    //         "score": 2,
    //         "replyingTo": "ramsesmiron",
    //         "user": {
    //           "image": {
    //             "png": "./images/avatars/image-juliusomo.png",
    //             "webp": "./images/avatars/image-juliusomo.webp"
    //           },
    //           "username": "juliusomo"
    //         }
    //       }
    //     ]
    //   }
    // ]
  }

  // nombre='';
  // apellido='';
  contentAddComment:string='';

  //imagen current image
  imagenCurentUser:string=this.data.currentUser.image.png;
  curentUserName:string=this.data.currentUser.username;

  //image dinamic
  imgePerfil:string='';

  //reply
  replyState:boolean=false;
  idUser:number=0;

  replyComment='';

  //indice para eliminar commet
  indice:number=0;
  idx:number=0;
  level:number=0;


  //variable Edit
  //edit:boolean=true;
  edit:any={
    'edit_0':true,
    'edit_1':true,

  };

  cardCommentContent:string='';

  constructor(
    private renderer: Renderer2,
    )
    {}

  modal:boolean=false;

  onUpdate(index:number){
    if(this.level===0){
      this.data.comments[this.indice].content=this.cardCommentContent;
      this.data.comments[this.indice].createdAtDate=new Date().toISOString();
    }else if (this.level===1){
      this.data.comments[this.indice].replies![this.idx].content=this.cardCommentContent;
      this.data.comments[this.indice].replies![this.idx].createdAtDate=new Date().toISOString();
    }
    localStorage.setItem("ListaComment",JSON.stringify(this.data.comments));
    this.refreshTemplateTimes(this.data.comments);
    //this.edit=true;
    this.edit['edit_0']=true;
    this.edit['edit_1']=true;
    // console.log(this.edit['edit_1']);
    // console.log(this.indice);
    // console.log( this.idx);
    this.indice=0;
    this.idx=0;

  }



  onEdit(index:number,idx:number,content:string,level:number){
    this.indice=index;
    this.idx=idx;
    this.cardCommentContent=content;
    this.level=level;
    if(this.level===0){
      this.edit.edit_0=false;
    }else if(this.level===1){
      this.edit.edit_1=false;
    }
  }

  onDelete(index:number,idx:number,level:number){
    this.modal=true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.indice=index;
    this.idx=idx;
    this.level=level;
  }

  onDeleteComment(){
    if(this.level===0){
      this.data.comments.splice(this.indice,1);

    }else if(this.level===1){
      this.data.comments[this.indice].replies!.splice(this.idx,1);
    }
    localStorage.setItem("ListaComment",JSON.stringify(this.data.comments));
    this.onCloseModal();
    this.refreshTemplateTimes(this.data.comments);
  }

  onCloseModal(){
    this.modal=false;
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  }

  addComment(){
    const addcoment:comment = {
      id:this.data.comments.length+1,
      content:this.contentAddComment,
      createdAt:'now',
      createdAtDate:new Date().toISOString(),
      score:0,
      user:{
        image:{
          png:this.data.currentUser.image.png,
          webp:this.data.currentUser.image.webp
        },
        username:this.data.currentUser.username,
      },
      replies:[]
    };

    this.data.comments.push(addcoment);
    localStorage.setItem("ListaComment",JSON.stringify(this.data.comments));
    this.refreshTemplateTimes(this.data.comments);
    this.contentAddComment='';
    //console.log(this.calculateDiffTime(new Date().toISOString(),new Date().toISOString()));
  }

  reply(id:number,username:string){
    this.replyComment=`@${username}, `;
    if(this.idUser!==id){
      this.replyState=false;
      this.idUser=id;
      this.replyState=true;
    }else{
      this.replyState=!this.replyState;
    }
  }

  addReplyComment(index:number){
    let id:number=0;

    //Type Assertion
    if (this.data.comments[index].replies !== undefined ){
      if(this.data.comments[index].replies!.length !== undefined) {
          id=this.data.comments[index].replies!.length + 1;
      }
    }

    const replyComent:comment = {
      id:id,
      content:this.replyComment,
      createdAt:'now',
      createdAtDate:new Date().toISOString(),
      score:0,
      user:{
        image:{
          png:this.data.currentUser.image.png,
          webp:this.data.currentUser.image.webp
        },
        username:this.data.currentUser.username,
      },
      replies:[]
    };

    this.data.comments[index].replies!.push(replyComent);
    localStorage.setItem("ListaComment",JSON.stringify(this.data.comments));
    this.refreshTemplateTimes(this.data.comments);
    this.replyComment='';
    this.replyState=false;
  }

  onAddScore(index:number,idx:number,level:number){
    if(level===0){
        this.data.comments[index].score++;
    }else if(level===1){
        this.data.comments[index].replies![idx].score++;
    }
    localStorage.setItem("ListaComment",JSON.stringify(this.data.comments));
    this.refreshTemplateTimes(this.data.comments);
  }

  onMinusScore(index:number,idx:number,level:number){
    if(level===0){
      if(this.data.comments[index].score>0){
        this.data.comments[index].score--;
      }
    }else if(level===1){
      if(this.data.comments[index].replies![idx].score>0){
        this.data.comments[index].replies![idx].score--;
      }
    }
    localStorage.setItem("ListaComment",JSON.stringify(this.data.comments));
    this.refreshTemplateTimes(this.data.comments);
  }


  showTime(listComment:comment[]){
    for(let i=0;i<listComment.length;i++){
      if(listComment[i].createdAtDate){
        listComment[i].createdAt= this.calculateDiffTime(listComment[i].createdAtDate?.valueOf(),new Date().toISOString());
      }
      for(let y=0;y<listComment[i].replies!.length;y++){
        if(listComment[i].replies![y].createdAtDate){
          listComment[i].replies![y].createdAt=this.calculateDiffTime(listComment[i].replies![y].createdAtDate?.valueOf(),new Date().toISOString());
        }
      }
    }
  }

  calculateDiffTime(startingDate:any, endingDate:string): string{

    let startDate = new Date(new Date(startingDate).toISOString());
    if (!endingDate) {
      endingDate = new Date().toISOString(); // need date in YYYY-MM-DD format
    }

    let endDate = new Date(endingDate);

    if (startDate > endDate) {
      const swap = startDate;
      startDate = endDate;
      endDate = swap;
    }

    const startYear = startDate.getFullYear();

    const february =
    (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();

    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }

    let dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
          yearDiff--;
          monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }

    //Time
    let hourDiff=endDate.getHours()-startDate.getHours();

    //hora
    if(hourDiff<0){
      if(dayDiff>0){
        dayDiff--;
        hourDiff+=24;
      }else{
        if(monthDiff>0){
          monthDiff--;
          dayDiff += (daysInMonth[startDate.getMonth()]-1);
          hourDiff+=24;
        }else{
            yearDiff--;
            monthDiff+=11;
            dayDiff+=(daysInMonth[startDate.getMonth()]-1);
            hourDiff+=24;
        }
      }
    }

    let minuteDiff=endDate.getMinutes()-startDate.getMinutes();
    //minutos
    if(minuteDiff<0){
      if(hourDiff>0){
        hourDiff--;
        minuteDiff+=60;
      }else{
        if(dayDiff>0){
          dayDiff--;
          hourDiff+=23;
          minuteDiff+=60;
        }else{
          if(monthDiff>0){
            monthDiff--;
            dayDiff+=(daysInMonth[startDate.getMonth()]-1);
            hourDiff+=23;
            minuteDiff+=60;
          }else{
            yearDiff--;
            monthDiff+=11;
            dayDiff+=(daysInMonth[startDate.getMonth()]-1);
            hourDiff+=23;
            minuteDiff+=60;
          }
        }
      }
    }

    //segundos
    let secondsDiff=endDate.getSeconds()-startDate.getSeconds();

    if(secondsDiff<0){
      if(minuteDiff>0){
        minuteDiff--;
        secondsDiff+=60;
      }else{
        if(hourDiff>0){
          hourDiff--;
          minuteDiff+=59;
          secondsDiff+=60;
        }else{
          if(dayDiff>0){
            dayDiff--;
            hourDiff+=23;
            minuteDiff+=59;
            secondsDiff+=60;
          }else{
            if(monthDiff>0){
              monthDiff--;
              dayDiff+=(daysInMonth[startDate.getMonth()]-1);
              hourDiff+=23;
              minuteDiff+=59;
              secondsDiff+=60;
            }else{
              yearDiff--;
              monthDiff+=11;
              dayDiff+=(daysInMonth[startDate.getMonth()]-1);
              hourDiff+=23;
              minuteDiff+=59;
              secondsDiff+=60;
            }
          }
        }
      }
    }

    if(yearDiff>0){
      return `${yearDiff} year ago`;
    }else if(monthDiff>0){
      return `${monthDiff} months ago`;
    }else if(dayDiff>0){
      return `${dayDiff} days ago`;
    }else if(hourDiff>0){
      return `${hourDiff} hours ago`;
    }else if(minuteDiff>0){
      return `${minuteDiff} minutes ago`;
    }else if(secondsDiff>0){
      return `${secondsDiff} seconds ago`;
    }else{
      return 'now';
    }
    //return {yearDiff, monthDiff,dayDiff,hourDiff,minuteDiff,secondsDiff};
  }

  refreshTemplateTimes(ListaCommentArray:comment[]):void{
    this.showTime(ListaCommentArray);
    this.data.comments=[...ListaCommentArray];
    console.log(this.data.comments);
  }

  formatoFecha(fecha:Date, formato:String) {
    const map:formatFecha = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yy: fecha.getFullYear().toString().slice(-2),
        yyy: fecha.getFullYear(),
    }
    return formato.replace(/dd|mm|yyy|yy/gi, (matched)=>{
        return String(map[matched]);
    });
  }

  ngOnInit(){
    let ListaComment: string | null = localStorage.getItem("ListaComment");
    if(!ListaComment){
      localStorage.setItem("ListaComment",JSON.stringify([]));
      this.data.comments=[];
    }else{
        const ListaCommentArray=JSON.parse(ListaComment);
        this.refreshTemplateTimes(ListaCommentArray);
      }
    }

  ngAfterViewInit(){
    console.log('dh');
  }
}


