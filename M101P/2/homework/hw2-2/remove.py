
import pymongo
import sys

# establish a connection to the database
connection = pymongo.Connection("mongodb://localhost", safe=True)

# get a handle to the students database
db=connection.students
grades = db.grades


def count():
    print "Grades: "
    
    try:
        recordCount = grades.count()
        print recordCount
        return recordCount
        
    except:
        print "Unexpected error:", sys.exc_info()

# Main function
def drop_low():

    try:
        prev_student_id = None

        c = grades.find({ "type": "homework" }).sort([("student_id",pymongo.ASCENDING), ("score",pymongo.ASCENDING)])


        recRemoved = count() != 800
        
        if (recRemoved):
            print "Removed already"

        for doc in c:
            curr_student_id = doc["student_id"]
            
            if(prev_student_id == None or prev_student_id != curr_student_id):
                current_student_lowest_score = doc["score"]
                current_student_lowest_score_doc_id = doc["_id"]
                print current_student_lowest_score_doc_id, curr_student_id, current_student_lowest_score
                if (not recRemoved):
                    print "score removed"
                    db.grades.remove(current_student_lowest_score_doc_id)
                
            prev_student_id = curr_student_id
    
    except:
        print "Unexpected error:", sys.exc_info()[0]
        
drop_low()
