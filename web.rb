require 'sinatra'
require 'rubygems' 

get '/' do
	erb :obesity
end

get '/obesity' do
	erb :main
end

get '/map' do
	erb :map
end
