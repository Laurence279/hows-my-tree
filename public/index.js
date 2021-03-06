
;
(async function getAndUpdateTrees() {
    const response = await fetch("/trees");
    const data = await response.json();
    responseData = data;
    treeData = data.payload;
    showButtons();
    populateTrees(treeData, TREES_TO_RENDER_PER_LOAD, true)
    
})();

async function getTrees() {
    const response = await fetch("/trees");
    return response;
};

var responseData = {};
var treeData = []
var treesRendered = [];
const TREES_TO_RENDER_PER_LOAD = 8;
var sortMethod = "last-watered"


// setInterval(() => {
//     if(document.documentElement.scrollTop >= 200){
//         const arr = treeData.filter((item)=>{
//             return !treesLoaded.includes(item.id)
//         })
//         populateTrees(arr)
//     }
// }, 100);

// async function requestTreeUpdate(id) {
//     const response = await fetch(`/trees/${id}`, {
//         method: `GET`,
//         headers: {
//             'content-type': 'application/json'
//         }
//     });
// }


// Cache


const search = document.querySelector("#search")
const searchBtn = document.querySelector("#search-btn")
const sortDropdown = document.querySelector("#sort-dropdown")
const displayGrid = document.querySelector("#tree-display-grid")
const loadBtn = document.querySelector("#load-btn")
const plantBtn = document.querySelector("#plant-btn")


function showButtons(){
    loadBtn.hidden = false;
    plantBtn.hidden = false;
}

searchBtn.addEventListener("click", async (e) => {
    //Clear the grid and render new trees based on query (Can be all trees if user so wishes..)
    displayGrid.innerHTML = "<h1>Fetching Trees!</h1>"
    const response = await fetch(`/trees?search=${search.value}`);
    const data = await response.json();
    responseData = data;
    treeData = data.payload;
    populateTrees(treeData, TREES_TO_RENDER_PER_LOAD, true)
})


loadBtn.addEventListener("click", async (e) =>{
    //Get trees that haven't been rendered yet and append to the already rendered trees.
    loadBtn.textContent = "One moment..."
    setTimeout(() => {
        const treesToRender = treeData.filter((item)=>{
            return !treesRendered.includes(item.id)
        })
        populateTrees(treesToRender, TREES_TO_RENDER_PER_LOAD, false)
        loadBtn.textContent = "Load More"
    }, 10);


}) 

sortDropdown.value = "last-watered";
sortDropdown.addEventListener("change", async (e)=>{

    sortMethod = (e.target.value)
    // const treesToRender = treeData.filter((item)=>{
    //     return treesRendered.includes(item.id)
    // })
    // if(treesToRender.length <= 0) return
    populateTrees(treeData, TREES_TO_RENDER_PER_LOAD, true)

})


async function createNewTree(object) {
    const tree = document.createElement("a")
    tree.href = `/${object.id}`
    const treeContent = document.createElement("div");
    treeContent.classList.add("tree-container")
    const img = document.createElement("canvas");
    initialiseTreeCanvas(object, img) //Very expensive
    const id = document.createElement("h4");
    id.classList.add("tree-id")
    id.textContent = `${object.id}`;
    const ownerDetails = document.createElement("h3");
    ownerDetails.textContent = `${object.ownertitle} ${object.ownerfirstname[0]}. ${object.ownerlastname}`
    const treeDetails = document.createElement("h4");
    treeDetails.textContent = `${object.label || "It's a tree!"}`
    treeContent.appendChild(id)
    treeContent.appendChild(ownerDetails)
    treeContent.appendChild(img)
    treeContent.appendChild(treeDetails)

    tree.appendChild(treeContent)
    return tree
}

async function populateTrees(data, numToRender, clearPage) {
    /*  Data: The list of trees to be rendered
        numToRender: The amount of trees to render before stopping
        clearPage: Bool - Should the page be cleared/reset first? Set true if query, false if appending additional data.

        If list of trees is less than the total to be rendered, reassign the number to match and hide the load more button.
    */
    if(data.length < numToRender) {
        numToRender = data.length
        loadBtn.hidden = true;
    }
    if(clearPage) {
        displayGrid.innerHTML = ""
        treesRendered = [];
        loadBtn.hidden = false;
    }

    const trees = data.sort(function (a, b) {
        switch(sortMethod){
            case "last-watered":
                return new Date(a.datewatered) - new Date(b.datewatered)
            case "last-created":
                return a.id - b.id
        }
    }).reverse()

    for (let i = 0; i < numToRender; i++) {
        const tree = await createNewTree(trees[i])
        displayGrid.appendChild(tree)
        treesRendered.push(trees[i].id)
    }
    const newTreesToRender = treeData.filter((item)=>{
        return !treesRendered.includes(item.id)
    })
    if(newTreesToRender.length <= 0){
        loadBtn.hidden = true
        return
    } 
}


        var height = 500;
        var width = 600;
        
        
        // Generate the seed's array on client side here:
        let index = 0;

        
        function generateBranches(seed){
        
        
            const nums = Array.from({
                length: 100000
            }, () => (simple_random()));
            
            function simple_random(precision = 10000) {
                x = Math.sin(seed++) * precision;
                return x - Math.floor(x);
            }
        
            return nums;
        }
        
        let nums;
        
        //Create the tree!
        function drawTree(treeData) {
            // Store data from database object here
        
        nums = generateBranches(treeData.seed)

            const scale = treeData.scale; //0.2 - 0.75 - Growth stage - Increases over time.
            const maxBranchWidth = treeData.branchwidth; //1 - 40 - Allow user to choose
            const colour = treeData.colour; // Allow user to choose
            const branchColour = treeData.branchcolour;
            const leaves = treeData.leaves; // Allow user to choose
        
        
        
            switch (leaves) {
                case 'small':
                    leafType = tree.SMALL_LEAVES;
                    break;
                case 'medium':
                    leafType = tree.MEDIUM_LEAVES;
                    break;
                case 'big':
                    leafType = tree.BIG_LEAVES;
                    break;
                case 'thin':
                    leafType = tree.THIN_LEAVES;
                    break;
                default:
                    leafType = tree.MEDIUM_LEAVES;
            }
            const treeSpread = 0.6;
            const drawLeaves = true;
            const lengthFactor = 200;

        
        
            ctx.save();
            tree.draw(ctx, height, width, treeSpread, drawLeaves, leafType, lengthFactor, maxBranchWidth,
                colour, branchColour, scale);
            ctx.restore();
        }
        
        function initialiseTreeCanvas(treeData, canvas) {
        
            index = 0;
            var canvas = canvas;
        
            if (canvas.getContext("2d")) {
        
                // document.getElementById("saveImage").onclick = function () {
                //     window.location = canvas.toDataURL("image/png");
                // }
   
                canvas.height = height;
                canvas.width = width;
                ctx = canvas.getContext("2d");
                drawTree(treeData);
        
            } else {
                document.getElementById('form_container').innerHTML = "Your browser doen't support Canvas!";
            }
        };
        
        var tree = {
        
        
            canvas: '',
            ctx: '',
            height: 0,
            width: 0,
            drawLeaves: true,
            leavesColor: '',
            branchColour: '',
            leafType: this.MEDIUM_LEAVES,
            lengthFactor: 200,
            maxBranchWidth: 10,
            SMALL_LEAVES: 10,
            MEDIUM_LEAVES: 200,
            BIG_LEAVES: 500,
            THIN_LEAVES: 750,
        
            /**
             * @member draw
             * tree.draw() initializes tthe tree structure
             *
             * @param {object} ctx      the canvas context
             * @param {integer} h       height of the canvas
             * @param {integer} w       width of the canvas
             * @param {float} spread    how much the tree branches are spread
             *                          Ranges from 0.3 - 1.
             * @param {boolean} leaves  draw leaves if set to true    
             *
             */
            draw: function (ctx, h, w, spread, leaves, leafType, lengthFactor, maxBranchWidth, colour, branchColour,
                scale) {
    
        
                this.scale = scale
        
        
        
        
        
                // Set how much the tree branches are spread
                if (spread >= 0.3 && spread <= 1) {
                    this.spread = spread;
                }
        
                if (leaves === true || leaves === false) {
                    this.drawLeaves = leaves;
                }
        
                this.leafType = leafType;
        
        
        
                if (lengthFactor >= 5 && lengthFactor <= 500) {
                    this.lengthFactor = lengthFactor
                }
        
                if (maxBranchWidth >= 1 && maxBranchWidth <= 50) {
                    this.maxBranchWidth = maxBranchWidth
                }
        
                this.ctx = ctx;
                this.height = h;
                this.width = w;
                this.ctx.clearRect(0, 0, this.width, this.height);
                // Center the tree in the window
                this.ctx.translate(this.width / 2, this.height);
                // Set the leaves to a random color
                this.leavesColor = colour;
                // Set branch thickness and colour
                this.branchColour = branchColour
                this.ctx.lineWidth = 1 + (1 * this.maxBranchWidth); // Was Random number 
                this.ctx.lineJoin = 'round';
        
                this.branch(0);
            },
        
            /**
             * @member branch
             * tree.branch() main tree drawing function
             *
             * @param {String} depth the maimum depth the tree can branch,
             *        Keep this value near 12, larger value take linger to render.
             *
             */
        
        
            branch: function (depth) {
        
        
                if (depth < 13) {
        
                    index += 1
        
        
                    this.ctx.strokeStyle = this.branchColour;
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, 0);
                    this.ctx.lineTo(0, -(this.height / 10));
                    this.ctx.stroke();
        
                    this.ctx.translate(0, -(this.height) / 10);
        
        
                    // Random integer from -0.1 to 0.1
                    var randomN = -(nums[index] * 0.2) + 0.1; // SETS THE TREE SWAY
                    //var randomN = 0;
                    this.ctx.rotate(randomN);
        
                    if (nums[index] < this.spread) {
        
                        // If num is less than the spread (0.7 default), then create a branch,
                        // Increment the depth, and run the branch function again.
                        // Otherwise, run the function again and check the number without incrementing
        
                        //So the higher the spread, the more branches will be made because it will check
                        //More often
        
        
                        // Draw the left branches
                        this.ctx.rotate(-0.3);
                        this.ctx.scale(this.scale, this.scale);
                        this.ctx.save();
                        this.branch(depth + 1);
                        // Draw the right branches
                        this.ctx.restore();
                        this.ctx.rotate(0.6);
                        this.ctx.save();
                        this.branch(depth + 1);
                        this.ctx.restore();
        
                    } else {
        
                        this.branch(depth);
                    }
        
                } else {
        
                    // Now that we have done drawing branches, draw the leaves
                    if (this.drawLeaves) {
                        var lengthFactor = this.lengthFactor;
        
                        if (this.leafType === this.THIN_LEAVES) {
                            lengthFactor = 30;
                        }
                        this.ctx.fillStyle = this.leavesColor;
        
                        this.ctx.fillRect(0, 0, this.leafType, lengthFactor);
                        this.ctx.stroke();
                    }
                }
        
            }
        };
        
        
        
        
        
        /*
                
                            Algorithmic Tree - 1.0.0
                            drawing trees algorithmically on the HTML5 canvas
                
                            License       : GPL
                            Developer     : Sameer Borate: http://codediesel.com
                            Web Site      : http://codediesel.com
                
                         */
        
        //#endregion