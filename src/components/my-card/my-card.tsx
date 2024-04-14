import { Component, h, Prop, State, Watch } from '@stencil/core';
import { err } from '@stencil/core/internal/utils/result';
import { error } from 'console';
import { watch } from 'fs';
import { disconnect } from 'process';
//it is custom ele so itbis like tag name so we can use it throughout app

@Component({
    tag: 'my-card',
    //    styles:` :host {
    //     display: block;
    //     padding: 20px;
    //     background-color: #ffffff;
    //     border-radius: 8px;
    //     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    //   },
    //   //inline style
    //  /* Example of styling a child element */
    //   .title {
    //     font-size: 24px;
    //     color: #333333;
    //   }`,
    styleUrl: 'my-card.css',
    //shadow: true,
    scoped: false,
})
export class MyCard {
    @Prop() name: string;
    //we can also change the props name here by using changestate but it shows warning that u muted props value in child comp
    @State() APIData: any[];
    //when we know value will be change then we need to put it into state
    @State() showReact: boolean;
    @State() showStencil: boolean;
    @State() users: any[] = [];
    changeState() {
        this.name = 'nidhi';
        this.fname = 'bani';
        this.APIData = [];
        // this.showCard=false;
    }
    //mutable true tells that we will mute the prop val from child comp -it dont theow erroe/warning
    @Prop({ mutable: true }) fname: string;
    //showCard:boolean=true;
    //life cycle method
    // connectedCallback() {
    //     //comp render in dom
    //     console.log('connected call back');
    // }
    // disconnectedCallback() {
    //     console.log('disconnected call back');
    // }
    async componentWillLoad() {
        //this method called once it is good place to
        //load data asynchronoulsy
        try {
            this.APIData = ['loading...'];
            const response = await fetch('http://localhost:5020/api/UserLogin');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            this.users = data;
            console.log('Data loaded successfully:', this.users);

        } catch (err) {
            console.log(err);
        }

        //  console.log('Component is about to be load(will load)');
    }
    // componentWillRender() {
    //     //it is recommended to make any rendered state updates

    //     console.log('Component is about to be(will) rendered');
    // }

    // componentDidLoad() {
    //     //just after component fully loaded
    //     //and the first render()occure

    //     console.log('Component has been (did)load');
    // }

    // componentWillUpdate() {
    //     console.log('comp updated');
    // }
    // componentDidUpdate() {
    //     console.log('Component did update');
    // }
    // componentShouldUpdate() {
    //     //this hook is called when a components's props change
    //     //property changed and render is about to be request
    //     console.log('should update');
    //     return true;
    // }
    changeInput(event: Event) {
        this.name = (event.target as HTMLInputElement).value;
    }
    contentChange(content: string) {
        if (content == 'react') {
            this.showReact = true;
            this.showStencil = false;
        } else if (content == 'stencil') {
            this.showStencil = true;
            this.showReact = false;
        } else {
            this.showStencil = false;
            this.showReact = false;
        }
    }
    APIDataLoad(Event) {
        console.log(this.users)
        this.users.forEach(element => {
            console.log(element.id)

        });
        this.APIData = this.users;

    }
    @Watch('name')
    watchHandler(newValue: boolean, oldValue: boolean) {
        console.log('the new val of name is ' + newValue + ' old value is ' + oldValue);
    }
    render() {
        //let content=<div>this is content</div>;
        let reactContect = (
            <div class="card-custom">
                <div>
                    Hello, from reactContect
                    <br></br>
                    <br></br>
                    <button class="btn-react" onClick={this.changeState.bind(this)}>
                        Get react users
                    </button>
                    <br></br>
                </div>
            </div>
        );
        let stencilContect = (
            <div class="card-custom">
                <div>
                    Hello, from stencil content
                    <br></br>
                    <br></br>
                    <button class="btn-stencil">Get stencil users</button>
                    <br></br>
                </div>
            </div>
        );
        let displayContent = '';
        if (this.showReact) {
            displayContent = reactContect;
        } else if (this.showStencil) {
            displayContent = stencilContect;
        }
        let mainContect = (
            <div class="my-card-wrapper">
                <div>
                    <h1>
                        hi,I am {this.fname} {this.name}
                    </h1>

                    <h4>
                        {this.APIData.map(ele => (
                            <span key={ele.id}>{ele.firstname}{" "}</span>
                        ))}
                    </h4>
                    <button class="btn-stencil" onClick={this.contentChange.bind(this, 'stencil')}>
                        stencil{' '}
                    </button>
                    <button class="btn-react" onClick={this.contentChange.bind(this, 'react')}>
                        react{' '}
                    </button>
                    {displayContent}
                    {/* {stencilContect} */}

                    <h></h>
                    <h2>Two-way data binding</h2>
                    <input type="text" value={this.name} class="my-input" onInput={this.changeInput.bind(this)} />
                    <button class="btn-react" onClick={this.APIDataLoad.bind(this)}>click to load data </button>
                </div>
            </div>
        );
        return mainContect;
    }
}
