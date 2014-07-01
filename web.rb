require 'sinatra'
require 'rubygems' 

get '/' do
  erb :obesity
end

get '/obesity' do
  erb :main
end
