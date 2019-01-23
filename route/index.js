const express=require('express');
const router=express.Router();

var fs=require('fs');

router.get('/',function(req,res)
{
    fs.readFile("storage.json","utf8",function(error,data)
    {
        tasks= JSON.parse(data);
        res.json(tasks);
    })
})
function Task(taskName,isdone)
{
   this.taskName=taskName;
   this.isdone=isdone;
}

router.post("/add/task",(req,res)=> {

    data = fs.readFileSync("storage.json","utf8");
    data = data.toString();

    tasks = JSON.parse(data);
    task = new Task(req.body.taskName,false);
    tasks.push(task);


    fs.writeFile("storage.json",JSON.stringify(tasks),(err,data) => {
        if(err) {
            res.json({
                error : err
            })
        } 
        
        else {
            res.json({
                response : "created successfully"
            });
        }
    })

}

);

router.get("/view/:id",(req,res) => {
    id = Number(req.params.id);
    data = fs.readFileSync("storage.json","utf8");
    data = data.toString();

    tasks = JSON.parse(data);

    if(id >= 0 && id < tasks.length){
        res.json(tasks[id]);
    }
    else{
        res.json({
            error: "Task with id :" + id.toString() + " doesn't exist"
        })
    }
    
});

router.delete("/delete/task/:id",(req,res) =>{
    id = Number(req.params.id);
    data = fs.readFileSync("storage.json","utf8");
    data = data.toString();

    tasks = JSON.parse(data);
    
    if(id >= 0 && id < tasks.length){
        tasks.splice(id,1);

        fs.writeFile("storage.json",JSON.stringify(tasks),(err,data) => {
            if(err) {
                res.json({
                    error : err
                })
            } 
            
            else {
                res.json({
                    response : "Deleted succussfully",
                    task_id : id
                });
            }
        })
    }

    else{
        res.json({
            error : "task id: " + id + " not found" 
        })
    }



})
module.exports=router;