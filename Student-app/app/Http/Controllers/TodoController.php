<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\File;
class TodoController extends Controller
{
    private $status_code = 200;
    function addTodo(Request $request)
    {
        //dd($request->file('image'));
        $validator = validator::make($request->all(),[
            'name'=>'required',
            'status'=>'required',
            'image' => 'required',

            
        ]);
        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }else{
        $todo = new Todo;
        $todo->name = $request->input('name');
        $todo->status = $request->input('status');
        $todo->user_id = $request->input('user_id');
        if($request->hasFile('image')){
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.'.$extension;
            $file->move('uploads/images/',$filename);
            $todo->image = 'uploads/images/'.$filename;
        }
        $todo->save();

        return response()->json(["status" => $this->status_code, "success" => true, "message" => "Added completed successfully", "data" => $todo]);
    }
    }

    public function find(Request $request)

    {
    
    $name= $request['name']?? "";
    
    if($name != ""){
    
    $todo= Todo::where('name','LIKE','%'.$name.'%')
    
    ->where('user_id',$request->user_id)
    
    ->get();
    
    }else{
    
    $todo= Todo::where('user_id',$request->user_id)->get();
    
    }
    if($todo){
        return response()->json(["status" => $this->status_code,'Todo'=>$todo]);
    }
    
    return response()->json(["status" => 'Failed','Todo'=>"Todo Not Found"]);
    
    }


    public function update(Request $request, $id) {

        $todo = Todo::find($id);
        
        if($todo){

        $todo->name = $request->input('name');
       
        $todo->status = $request->input('status');
        if($request->hasFile('image')){
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time().'.'.$extension;
            $file->move('uploads/images/',$filename);
            $todo->image = 'uploads/images/'.$filename;
        }
        
        $todo->update();
        //dd($todo);

        return response()->json(["status" => 200,"message"=>"Successfully Updated",'Todo'=>$todo]);
        }
           else {
                return response()->json(["status" => 404,"message"=>"Failed Updated"]);

            }
    }  


    public function delete($id)
    {

        
         $todo=Todo::whereid($id)->first()->delete();
         

            return response()->json(["status" => $this->status_code,'message'=>"Delete Successfully",'Todo'=>$todo]);

    }

    public function edit($todo_id){
        $Todo = Todo::find($todo_id);
        if($Todo){
            return response()->json(["status" => 200,"message"=>"Success",'Todo'=>$Todo]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Failed'
            ]);
        }

    }


}
