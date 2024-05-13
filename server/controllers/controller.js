import mongoose from 'mongoose';
// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";
import { itemSchema } from '../models/itemModel.js';

const Item = mongoose.model('items', itemSchema);

export const getMyItems = (req, res) => {
    Item.find({ user: req.params.userId })
        .then(items => {
            res.json(items);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
};

export const getAllItems = (req, res) => {
    Item.find()
        .then(items => {
            res.json(items);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
};

export const addNewItem = (req, res) => {
    console.log(req.body)
    let newItem = new Item(req.body);
    newItem.save()
        .then(item => {
            res.json(item);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err);
        });
};

export const editItem = (req, res) => {
    Item.findOneAndUpdate({ _id: req.params.itemId }, req.body, { new: true })
        .then(updatedItem => {
            res.json(updatedItem);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
};

export const deleteItem = (req, res) => {
    Item.deleteOne({ _id: req.params.itemId })
        .then(() => {
            res.json({ message: 'Successfully deleted item' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
};

