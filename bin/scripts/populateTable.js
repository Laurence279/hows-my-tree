import {
    query
} from "../db.js"
import trees from "../../exampleTreeData.js"

const sqlString = "INSERT INTO trees01(datePlanted, dateWatered , timesWatered, ownerTitle , ownerFirstName , ownerLastName , seed, scale, branchWidth,leaves ,colour , branchColour, label , password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *"



async function populateTable() {
    for (let i = 0; i < trees.length; i++) {
        const datePlanted = trees[i].datePlanted
        const dateWatered = trees[i].dateWatered
        const timesWatered = 0
        const ownerTitle = trees[i].ownerTitle
        const ownerFirstName = trees[i].ownerFirstName
        const ownerLastName = trees[i].ownerLastName
        const seed = trees[i].seed
        const scale = trees[i].scale
        const branchWidth = trees[i].branchWidth
        const leaves = trees[i].leaves
        const colour = trees[i].colour
        const branchColour = trees[i].branchColour
        const label = trees[i].label
        const password = trees[i].password
        const response = await query(sqlString, [datePlanted, dateWatered, timesWatered, ownerTitle, ownerFirstName, ownerLastName, seed, scale, branchWidth, leaves, colour, branchColour, label, password])
        console.log(response.rows)
    }
}
populateTable()