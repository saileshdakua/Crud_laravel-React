<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Todo;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class UserController extends Controller
{
    private $status_code = 200;


    public function register(Request $request){
         
       $validator = validator::make($request->all(),[
            
            'name'=>'required',
            'email'=>'required|unique:users|email',
            'phone'=>'required',
            'regdno'=>'required',
            'password'=>'required',
            
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }
        $user = new User();
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'phone'=>$request->phone,
            'regdno'=>$request->regdno,
            'password'=>Hash::make($request->password),
            
        ]);
        if(!is_null($user)) {
            $token = $user->createToken($request->email)->plainTextToken;
            return response()->json(["status" => $this->status_code, "message"=>"success","success" => true, "message" => "Registration completed successfully",'id'=>$user->id,'name'=>$user->name,'email'=>$user->email,'regdno'=>$user->regdno, "data" => $user,"token"=>$token]);
        }

        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "failed to register"]);
        }
    }

    public function login(Request $request){
        $validator = validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required',
        ]);
                if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }
        $user = User::where('email', $request->email)->first();
        if($user && Hash::check($request->password, $user->password)){
            $token = $user->createToken($request->email)->plainTextToken;
            
            return response()->json(["status" => $this->status_code, "success" => true,"message" => "Success", "message" => "You have logged in successfully",'id'=>$user->id,'name'=>$user->name,'email'=>$user->email,'regdno'=>$user->regdno, "data" => $user,"token"=>$token]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Incorrect Details."]);
        }
         
    }



    public function logout()
    {
       $logout = auth()->user()->tokens()->delete();
        if($logout){
            return response([
                'message' => 'Logout Success',
                'status'=>'success'
            ], 200);
        }else{
            return response([
                'message' => 'Logout Failed',
                'status'=>'Failed'
            ], 200);
        }

        

    }
    
    public function logged_user(){
        $loggeduser = auth()->user();
        if($loggeduser){
            return response([
                'user'=>$loggeduser,
                'message' => 'Logged User Data',
                'status'=>'success'
            ], 200);
        }else{
            return response([
                'message' => 'Logged User Data Not found',
                'status'=>'Failed'
            ], 401);
        }
    }


}
