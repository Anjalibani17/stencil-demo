import { Component, Prop, h } from "@stencil/core";
@Component({
    tag: 'get-data',
    styleUrl: 'get-data.css',
    shadow: true,
})
export class GetData {
    @Prop() First:string;
    @Prop() Middle:string;
    @Prop() Last:string;
format():string{
    return(
       ( this.First || ``)+
       (this.Middle ? ` ${this.Middle} ` : ``)+
       (this.Last ? ` ${this.Last} ` : ``)

    )
}
    render() {
        return (<div >
            <div class="container">
           
            <h1>welcome::{this.format()}</h1>
            </div>
       
        </div>);
    }


};