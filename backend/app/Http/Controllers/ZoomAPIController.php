<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ZoomAPIController extends Controller
{
    public $userId;
    public $userToken;


    function  __construct()
    {
        $this->userId ="LayQEPmhSyyVn_QE0FTgmw";
        $this->userToken ="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjJESFdWVVdNVFdLeWxwaHhfRHNXR3ciLCJleHAiOjE3OTg2NTU0MDAsImlhdCI6MTYxMjk0ODUzNX0.TPKy6U2bmat9crdkLAfnSihH-Lui7oF7kSSvEsAuDDs";
    }


    function getAllMeeting(Request $request)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://api.zoom.us/v2/users/'.$this->userId.'/meetings',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'GET',
          CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer '.$this->userToken,

          ),
        ));

        $response = curl_exec($curl);
        $error = curl_error($curl);
        curl_close($curl);

        if ($error) {
           return $error;
        }
        return  collect(json_decode($response ,true))->toArray();
        //return json_decode($response ,true);

    }

     function store(Request $request)
    {
        //return $request;
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://api.zoom.us/v2/users/me/meetings',
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'POST',
          CURLOPT_POSTFIELDS =>'{
            "topic": "'.$request->topic.'",
            "type": '.$request->type.',
            "start_time": "'.$request->start_time.'",
            "duration": "'.$request->duration.'",
            "password": "'.$request->password.'",
            "timezone": "Asia/Kolkata",
            "agenda": "pankaj test",
            "settings": {
                "host_video": 1,
                "participant_video": 1,
                "in_meeting": 1,
                "join_before_host": 1,
                "mute_upon_entry": 1,
                "watermark": 1,
                "approval_type": 2,
                "audio": "voip"
            }
        }',
          CURLOPT_HTTPHEADER => array(
            'Accept: application/json',
            'Content-Type: application/json',
             'Authorization: Bearer '.$this->userToken,
          ),
        ));

        $response = curl_exec($curl);
        $error = curl_error($curl);
        curl_close($curl);

        if ($error) {
           return $error;
        }
        return json_decode($response ,true);
    }


    public function viewMeeting(Request $request , $id)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => 'https://api.zoom.us/v2/meetings/'.$id,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => '',
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => 'GET',
          CURLOPT_HTTPHEADER => array(
              'Authorization: Bearer '.$this->userToken,
          ),
        ));

        $response = curl_exec($curl);
        $error = curl_error($curl);
        curl_close($curl);

        if ($error) {
           return $error;
        }
        return json_decode($response ,true);
    }


    public function updateMeeting(Request $request )
    {

        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.zoom.us/v2/meetings/'.$request->id,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'PATCH',
        CURLOPT_POSTFIELDS =>'{
            "topic": "'.$request->topic.'",
            "type": '.$request->type.',
            "start_time": "'.$request->start_time.'",
            "duration": '.$request->duration.',
            "timezone": "Asia/Kolkata",
            "password": "'.$request->password.'",
            "agenda": "My Meeting test",
            "settings": {
                "host_video": 1,
                "participant_video": 1,
                "in_meeting": 1,
                "join_before_host": 1,
                "mute_upon_entry": 1,
                "watermark": 1,
                "approval_type": 2,
                "audio": "voip"
            }
        }',
        CURLOPT_HTTPHEADER => array(
            'Accept: application/json',
            'Content-Type: application/json',
            'Authorization: Bearer '.$this->userToken,
        ),
        ));

        $response = curl_exec($curl);
                $error = curl_error($curl);
                curl_close($curl);

        if ($error) {
                return $error;
         }
           return json_decode($response ,true);
    }


    public function deleteMeeting( $id)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.zoom.us/v2/meetings/'.$id,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'DELETE',
        CURLOPT_HTTPHEADER => array(
            'Authorization: Bearer '.$this->userToken ),
        ));

        $response = curl_exec($curl);
        $error = curl_error($curl);
        curl_close($curl);

        if ($error) {
        return $error;
        }
        return json_decode($response ,true);
    }



}
