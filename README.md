# Musical Ear Trainer - A Game
COMP 4905 HONOURS PROJECT

Name: Steven Rhodes

DEMO VIDEO: https://www.youtube.com/watch?v=Lwxow8iDGrY&feature=youtu.be

File Contents:
		i)application (folder) => This is the main application and its files
			a)node_modules
			b)public => These are the css and javaScript files I used for my project
				i)css
					1)avatarPics => pictures used avatars
				ii)javaScript
			c)routes => these are my routes
				i)users.js
				ii)index.js
			d)views => these are my EJS files (similar to HTML)
				i)includes => folder with some common headers and footer
			e)app.js => main entry to application
			f)package.json
			g)testing => folder for uploading and deleting data for testing
				i)inputData.js => input data for testing
				ii)deleteData.js => deletes the data in the database
				

To run application:
	1. Set up MongoDB database
		a)Download MongoDB Community Server: https://www.mongodb.com/try/download/community
		b)Install MongoDB to your C: Drive. I used a custom setup to install
			to "C:\mongodb\"
		c)Continue Installation normally
		d)In newly created "mongodb" folder, create the following folders (3 in total):
			i)"data"
				a)inside "data" folder create another folder called "db"
			ii)"log"
			***These folders may have been created upon installation depending on version number of mongodb****
		e)navigate to \bin folder inside "C:\mongodb" folder
		d)start mongodb in background:
			i)run the following command:
				"mongod --directoryperdb --dbpath C:\mongodb\data\db --logpath C:\mongodb\log\mongodb.log --logappend --rest --install" 
			ii)if an error for "rest" occurs, just remove "--rest" from above command and re-run the command
			iii)make sure the file paths used in the command match where you installed mongodb
	2)Run application:
		a)Go to "COMP4905Project" folder (where app.js is located) and run "node app.js"
		b)The application will start on localhost:3002
	3)Go to localhost:3002
	4)Create a user by registering
	5)Go testing folder. run "node inputData.js" if you would like test data by uploading some users to the database
		a)password for these users will all be "pass"
		
	***I've followed these steps successfully on 2 devices with 2 different versions of mongodb***



To Upload Data and Delete for Testing:
	i)Go to testing folder. run "node inputData.js" to upload test data. There will be 10 users.
		a)password for these users will all be "pass"
	ii)run "node deleteData.js" to delete the user data





