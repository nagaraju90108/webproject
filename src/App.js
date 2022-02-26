import React, { Component } from 'react'
// import './App.css';
export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       newItem: "",
       list: []
    }
  }

  updateInput(key, value){
    this.setState({
      [key]: value
    });
  }
  
  addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    const list = [...this.state.list];
    list.push(newItem);
    this.setState({
      list,
      newItem:""
    });
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);
    this.setState({list: updatedList});
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) { 
      document.getElementById("mybutton").click();
    } 
}

  render() {
    return (
      <div className='App flex h-screen bg-rose-50'>
        <div class="flex-1">
          <div className='todolist py-2 font-serif text-4xl bg-rose-500 text-center text-white sm:text-7xl sm:py-4'>ToDo List</div>
          <div className='content'>
            <div className='additem text-center mt-6 -mb-4 text-xl font-semibold text-rose-600 sm:text-3xl lg:text-4xl lg:-mb-2'>
              Add an Item: 
            </div>
            <br/>
            <div className='myinput text-center'>
              <input
                id='takeinput'
                type='text' 
                placeholder = 'Type item here...'
                value={this.state.newItem}
                onChange = {e => this.updateInput('newItem', e.target.value)}
                onKeyPress={this.enterPressed.bind(this)}
                className = 'border-[1px] border-rose-400 rounded-md pl-2 p-1'
              />
              <button id='mybutton' onClick={() => this.addItem()} className= 'ml-4 px-4 py-[2px] border-[1px] border-rose-600 rounded-md text-rose-600 text-lg font-semibold bg-white hover:bg-rose-500 hover:text-white'>ADD</button>
              <br />
              <div className=' pt-4 text-lg text-red-500 m-1/6 '>
              <ol>
                {this.state.list.map(item => {
                  return(
                    <li key = {item.id}>
                      {item.value}
                      <button onClick={() => this.deleteItem(item.id)} className= 'px-2 m-2 border-[1px] border-rose-400 rounded-md text-sm text-rose-600 font-bold bg-white hover:bg-rose-500 hover:text-white' >
                        X
                      </button>
                    </li>
                  )
                })
                }
              </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App