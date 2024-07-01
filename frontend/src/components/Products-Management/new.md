Logic creation of the edit form image specifically.


Work Flow(One thing at a time)

Task 1   (Done)
------
1.   a toggler state to show if image exists or not

Task 2   (Done)
------
2.   if image exists:
	show the image
	make the toggler true
     if image does not exists:
	show a random image
	make the toggler false

Task 3 
------

Need to create Update Categories API For backend initially
3.  while image exists:
	a. If do not want to replace, then the same data will be submitted again
	how?
	store the image in a state, send that state back. (Done)
	
	b. Delete Logic: (Done)
		1. store the image in state initially, 
		==> Create a toggling state to to know whether to delete the image or not delete the image
		2. on deleting, the state will be null.
		3. the image will be deleted from cloudinary.
		4. the image will be deleted from the database.
		
	d. Replace Logic: (Working On)
	A replace button --> upload button will show
		Definition: new data will replace the previous one
		1. replace the existing image state with new image, just change the useState hook Value
		2. delete the older one from the database, and from the cloudinary.
		
Task 4
------
4. while image does not exists:
	a. keep the toggler false
	b. on selecting from the widget fill the image state



Task 5:
-------
5. Now handle the delete image on page refresh(basically when not submitted the form the image will be deleted)
Will make this logic once the Phase 1 Process completes
	
Process:
--------
Phase 1: Analyse the current code and figure how all the image logic is being handled.
Checking the image process how it is getting fixed
basically the same image should be replaced

Phase 2: Remove the necessary portion or change it with your new code.