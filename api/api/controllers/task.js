const { default: mongoose } = require('mongoose')
const Task = require('../models/task')

exports.getAll = (req, res, next) => {
    Task.
        find({ user: req.userData.userId })
        .then((result) => {
            res.status(200).json({
                count: result.length,
                tasks: result.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        body: doc.body,
                        isCompleted: doc.isCompleted,
                        request: {
                            type: 'GET',
                            url: `${req.protocol}://${req.get('host')}${req.originalUrl}/${doc._id}`
                        },
                    }
                })
            })
        })
}

exports.getOne = (req, res, next) => {
    const id = req.params.taskId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: "No valid ID" });
    }
    else {
        Task.findOne({ _id: req.params.taskId, user: req.userData.userId })
            .then(doc => {
                if (doc && doc != null) {
                    res.status(200).json({
                        task: doc,
                        request: {
                            type: 'GET',
                            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                        }
                    });
                } else {
                    res
                        .status(404)
                        .json({ message: "No valid entry found for provided ID" });
                }

            }
            )
    }

}

exports.create = (req, res, next) => {


    const task = new Task({
        name: req.body.name,
        body: req.body.body,
        user: req.userData.userId
    })
    task.save()
        .then(result => {
            res.status(201).json({
                message: "Task created",
                task: {
                    _id: result.id,
                    name: result.name,
                    body: result.body
                },
                request: {
                    type: "GET",
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl}/${result._id}`
                }
            })

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.delete = (req, res, next) => {
    const id = req.params.taskId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: "No valid ID" });
    }
    else {
        Task.deleteOne({ _id: id, user: req.userData.userId })
            .then(result => {
                if (result.deletedCount) {
                    res.status(200).json({
                        message: 'Task deleted',
                        request: {
                            type: 'POST',
                            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                        }
                    });
                }
                else {
                    res.status(404).json({
                        message: "Not found"
                    });
                }

            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    }


}

exports.update = (req, res, next) => {
    const id = req.params.taskId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400)
            .json({ message: "No valid ID" });
    }
    else {
        const upadteOps = {}
        for (const [key, value] of Object.entries(req.body)) {
            upadteOps[key] = value
        }
        Task.updateOne({ _id: id, user: req.userData.userId }, { $set: upadteOps })
            .then(result => {
                if (result.modifiedCount) {
                    res.status(200).json({
                        message: 'Product updated',
                        request: {
                            type: 'GET',
                            url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
                        }
                    });
                }
                else {
                    res.status(404).json({
                        message: "Not found"
                    });
                }


            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    }

}



