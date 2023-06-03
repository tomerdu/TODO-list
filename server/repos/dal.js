const { EventEmitter } = require('events');
const fs = require('fs');
const Path = require('path');

const dataRepos ={
    todoList: '../model/Todos.json',
}

class DataRepository extends EventEmitter {
    constructor (dataToConnect) {
        super();
        this.connectToStorage(dataToConnect);
    }

    connectToStorage (dataToConnect) {

        this.setData( require(`${dataRepos[dataToConnect]}`));
        this.on('updateData', () => {
            fs.writeFile(Path.join(__dirname, dataRepos[dataToConnect]), JSON.stringify(this.data), 'utf8', err => {
                if (err) throw err;
                console.log('File has been saved!');
            });
        });
        return this;
    }

    setData (data) {
        this.data = data;
    }

    updateData (payload) {
        this.setData([...this.data, payload]);
        this.emit('updateData');
    }
    updateAllData(newData){
        this.setData([...newData]);
        this.emit('updateData');
    }

    getAllData () {
        return this.data;
    }
};

module.exports = new DataRepository("todoList")
