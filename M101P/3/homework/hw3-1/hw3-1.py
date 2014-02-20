import pymongo
import sys

# Run Only once ! - Answer: 13

connection = pymongo.Connection("mongodb://localhost", safe=True)
db=connection.school
students = db.students
        
def print_scores():
    try:
        c = students.find({ "scores.type": "homework" })

        for doc in c:
            scores = doc["scores"]
            print doc["_id"], doc["scores"]
            removed_score = remove_low_homework(scores)
            print doc["_id"], doc["scores"]
            
            db.students.save(doc)
   
    except:
        print "Error:", sys.exc_info()[0], sys.exc_traceback.tb_lineno 
        

def remove_low_homework(scores):
    if (len(scores) == 0):
        return;

    low_hw_score_i = -1;
    iter = enumerate(scores)
    
    for i, score in iter:
        if(score["type"] == u"homework"):
            if(low_hw_score_i < 0 or score["score"] < scores[low_hw_score_i]["score"]):
                low_hw_score_i = i
            
    if(low_hw_score_i >= 0):
        return scores.pop(low_hw_score_i)

print_scores()
