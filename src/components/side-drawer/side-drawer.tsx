import { Component,Prop,h } from "@stencil/core";

//class name same as componnet name but without dash and first ch is capital
//class decorator - stencil transform class into web component during build process 
//decorator contain object
@Component({
    //tag name contain unique name + -(dash )
    tag:'side-drawer',
    styleUrl:'./side-drawer.css',
    // 
    scoped:true
   
})
//class class SideDrawer extends HTMLElement
//or
 export class SideDrawer {
@Prop({reflect:true}) title:string;
@Prop() open:boolean;

render(){
    let content=null;
    if(this.open)
        { //just pass open as props in this component
            content=(<aside>
            <header> <h1>{this.title}</h1></header>
           
            {/* . It acts as a placeholder inside your component's template where you can insert content from the outside. */}
            <slot/>
            </aside>)
        }
    return(content)
}
}