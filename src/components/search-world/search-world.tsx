import { Component, Prop, State, h } from "@stencil/core";
import { parse } from "path";
import { json } from "stream/consumers";
@Component({
    tag: 'search-world',
    styleUrl: 'search-world.css',
    shadow: true
})
export class SearchWorld {
    @Prop({ mutable: true }) SearchText: string;
    @State() SearchRes: { firstname: string; lastname: string }[] = [];
    @State() ResData:Array<object>=[];
    @State() userId: string;
    onUserInput(event: Event) {
        this.userId = (event.target as HTMLInputElement).value;
        this.SearchText = this.userId;
    }
    async searchFromApi() {
        try {
            const response = await fetch('http://localhost:5020/api/UserLogin/' + this.SearchText);
            const data = await response.json();
            console.log(data);
            if (data.status == 404) {
                alert("data not found");
            }
            this.SearchRes = [data]
        } catch (err) {
            console.log(err);
        }
    }
    async getAllData() {
        try {
            const response = await fetch('http://localhost:5020/api/UserLogin/');
            const data = await response.json();
            
            console.log("new",data);
            if (data.status == 404) {
                alert("data not found");
            }
            this.ResData = [data];
            console.log(this.ResData);
        } catch (err) {
            console.log(err);
        }
    }
    render() {

        return (
            <div class="my-card-wrapper">
                <div>
                    <div class="title">Enter Id to load data </div>
                    <input type="number" class="my-input" value={this.SearchText} onInput={this.onUserInput.bind(this)} placeholder="enter id"></input>
                    <button onClick={() => this.searchFromApi()} class="btn-search">Click</button>
                    <div>
                        {
                            this.SearchRes.map(r => (
                                <div key={r.firstname}>
                                    <p>Firstname:{r.firstname}</p>
                                    <p>last name:{r.lastname}</p>
                                </div>
                            ))}
                    </div>
                </div>

            {/* another get req */}
            <div>
            <div class="title">click  to load  all data </div>
            <button onClick={() => this.getAllData()} class="btn-search">Click</button>
            <div>
                        {

                            this.ResData.map(r => (
                               
                             <div>
                               { console.log(r)}
                                {/* <p>{r.firstname}</p> */}
                             </div>
                            ))}
                    </div>
            </div>
            </div>);
    }
};
