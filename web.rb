require 'sinatra'
require 'rubygems' 

get '/' do
	# erb :obesity
	erb :obesity_rate
end

get '/obesity' do
	erb :main
end

get '/map' do
	erb :map
end

get '/map2' do
	erb :map2
end

get '/map_state' do
	erb :map_state
end

get '/scatter' do
	erb :scatter
end

get '/area' do
	erb :area
end