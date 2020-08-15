const Todo = require('../models/model.js');

// Create and Save a Todo
exports.create = (req, res) => {
    // Validation
    if(!req.body.title) {
        return res.status(400).send({
            message: "Todo title cannot be empty"
        });
    }

    // Create a Todo
    const newTodo = new Todo({
        title: req.body.title,
        completed: false
    });

    // Save Todo in the database
    newTodo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Todo."
        });
    });
};

// Retrieve and return all Todos
exports.findAll = (req, res) => {
    Todo.find()
    .then(todos => {
        res.send(todos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving Todos."
        });
    });
};

// Retrieve a Todo specified todoId
exports.findOne = (req, res) => {
    Todo.findById(req.params.todoId)
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoId
            });
        }
        res.send(todo);
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving Todo with id " + req.params.todoId
        });
    });
};

// Update a Todo using specified todoId
exports.update = (req, res) => {
    // Find Todo and update it with specified body
    Todo.findByIdAndUpdate(req.params.todoId, {
        title: req.body.title || "Untitled Todo",
        completed: req.body.completed
    }, {new: true})
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoId
            });
        }
        res.send(todo);
    }).catch(err => {
        return res.status(500).send({
            message: "Error updating todo with id " + req.params.todoId
        });
    });
};

// Delete a Todo using specified todoId
exports.delete = (req, res) => {
    Todo.findByIdAndRemove(req.params.todoId)
    .then(todo => {
        if(!todo) {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoId
            });
        }
        res.send({message: "Todo deleted successfully!"});
    }).catch(err => {
        if(err.name === 'NotFound') {
            return res.status(404).send({
                message: "Todo not found with id " + req.params.todoId
            });
        }
        return res.status(500).send({
            message: "Could not delete todo with id " + req.params.todoId
        });
    });
};