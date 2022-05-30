<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $headers =[
            'Access-Control-Allow-origin' => '*',
            'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS, GET, DELETE',
            'Access-Control-Allow-Credentials' =>'true',
            'Access-Control-Allow-Headers' => 'Content-Type, Accept, Authorization, X-Requested-With, Origin, Application' 
        ];

        if($request->isMethod('OPTIONS'))
        {
            return response()->json('ok',200,$headers);
        }

        $response = $next($request);

        if(\method_exists($response,'header'))
        {
            $response->headers->set('Access-Control-Allow-origin','*');
            $response->headers->set('Access-Control-Allow-Methods','POST, GET, OPTIONS, GET, DELETE');
            $response->headers->set('Access-Control-Allow-Headers','Content-Type, Accept, Authorization, X-Requested-With,Origin,Application');
            
        }

        if($response instanceof \Illuminate\Http\Response)
        {
            foreach($headers as $key =>$value)
            {
                $response->header($key,$value); 
            }
            return $response;
        }

        if($response instanceof \Symfony\Component\HttpFoundation\Response)
        {
            foreach($headers as $key =>$value)
            {
                $response->headers->set($key,$value);
                
            }
            return $response;
        }
        // Post-Middleware Action

        return $response;
    }
}
