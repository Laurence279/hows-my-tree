
//#region Tree Stage Planning

/*

Seed Types:

Fir:
Acacia:
Maple:
Redwood:
Elder:
Oak:
Birch:
Willow:

Fir:
Stage 1:

Single, small branch. No leaves

            const treeSpread = 1;
            const drawLeaves = false;
            const maxDepth = 1;
            const leaveType = tree.SMALL_LEAVES;
            const lengthFactor = 10;
            const maxBranchWidth = 5;
            const colour = "#008000";

Stage 2:

Trunk with 2 branching paths. No Leaves

            const treeSpread = 0.9;
            const drawLeaves = false;
            const maxDepth = 2;
            const leaveType = tree.SMALL_LEAVES;
            const lengthFactor = 10;
            const maxBranchWidth = 5;
            const colour = "#008000";


Stage 3:

Branching paths are longer and also have branches. No leaves

            const treeSpread = 0.8;
            const drawLeaves = false;
            const maxDepth = 3;
            const leaveType = tree.SMALL_LEAVES;
            const lengthFactor = 10;
            const maxBranchWidth = 5;
            const colour = "#008000";

Stage 4:



Stage 5:

Stage 6:

Stage 7:

Stage 8:

Stage 9:

Stage 10:


*/

//#endregion


//#region Tree Generator Code


        /* Fetch data from server here
                What data do we need?
                    - The seed used to regenerate the array on the client
                    - The stage of growth the tree is at (scale)
                    - Other properties of the tree?
                        - Branch width
                        - Colour
                        - Leaf Type

                e.g tree = {
                    seed: 100,
                    scale: 0.7,
                    maxBranchWith: 5,
                    colour: "#764f39"
                    leafType: MEDIUM_LEAVES

                }
         */

                var height = 500;
                var width = 600;
        
                // Store data from database object here
                let seed = 100; // Generate this number when creating tree
                const scale = 0.75; //0.2 - 0.75 - Growth stage - Increases over time.
                const maxBranchWidth = 20; //1 - 40 - Allow user to choose
                const colour = "#764f39"; // Allow user to choose
                const leaves = "big" // Allow user to choose
        
                // Generate the seed's array on client side here:
                let index = 0;
                const nums = Array.from({
                    length: 100000
                }, () => (simple_random()));
        
                function simple_random(precision = 10000) {
                    x = Math.sin(seed++) * precision;
                    return x - Math.floor(x);
                }
        
                //Create the tree!
                function drawTree() {
                    switch(leaves) {
                    case 'small': leafType = tree.SMALL_LEAVES;
                            break;
                    case 'medium': leafType = tree.MEDIUM_LEAVES;
                            break;
                    case 'big': leafType = tree.BIG_LEAVES;
                            break;
                    case 'thin': leafType = tree.THIN_LEAVES;
                            break;
                    default:leafType = tree.MEDIUM_LEAVES;
                }
                    const treeSpread = 0.6;
                    const drawLeaves = true;
                    const lengthFactor = 200;
        
                    ctx.save();
                    tree.draw(ctx, height, width, treeSpread, drawLeaves, leafType, lengthFactor, maxBranchWidth,
                        colour, scale);
                    ctx.restore();
                }
        
                function init() {
        
        
                    var canvas = document.querySelector("canvas");
        
                    if (canvas.getContext("2d")) {
        
                        // document.getElementById("saveImage").onclick = function () {
                        //     window.location = canvas.toDataURL("image/png");
                        // }
        
                        canvas.height = height;
                        canvas.width = width;
                        ctx = canvas.getContext("2d");
                        drawTree();
        
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
                    draw: function (ctx, h, w, spread, leaves, leafType, lengthFactor, maxBranchWidth, colour,
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
                        // Set branch thickness
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
        
        
        
                            this.ctx.beginPath();
                            this.ctx.moveTo(0, 0);
                            this.ctx.lineTo(0, -(this.height / 10));
                            this.ctx.stroke();
        
                            this.ctx.translate(0, -(this.height) / 10);
        
        
                            // Random integer from -0.1 to 0.1
                            //var randomN = -(Math.random() * 0.2) + 0.1; // SETS THE TREE SWAY
                            var randomN = 0;
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
        
        
        
                init();
        
        
                /*
        
                    Algorithmic Tree - 1.0.0
                    drawing trees algorithmically on the HTML5 canvas
        
                    License       : GPL
                    Developer     : Sameer Borate: http://codediesel.com
                    Web Site      : http://codediesel.com
        
                 */

                    //#endregion