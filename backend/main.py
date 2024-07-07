import requests
from bs4 import BeautifulSoup
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process():
    url = request.json['url']
    # url = "facebook.com"
    print("HELLO")
    try:
        print("Success")
        summarized = summary(url)
        if(summarized.split(maxsplit=1)[0] == "Error"):
            return jsonify(summarized), 500
        return jsonify(summarized), 200
    except Exception as e:
        print("ERROR: ", e)
        return jsonify(e), 500
    # result = "BOBO"
    # return jsonify(summarized), 200
    # return jsonify(result), 200
    print(summarized)


def fetch_text_from_url(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        text = ' '.join(map(lambda p: p.text, soup.find_all('p')))
        return text
    except Exception as e:
        error = "Error : " + str(e)
        return error

def summary(url):
    try:
        text = fetch_text_from_url(url)
        parser = PlaintextParser.from_string(text, Tokenizer("english"))
        stemmer = Stemmer("english")
        summarizer = LsaSummarizer(stemmer)
        summarizer.stop_words = get_stop_words("english")
        summary_sentences = summarizer(parser.document, 3)  # 3 is the number of sentences in the summary
        summarized = ' '.join(str(sentence) for sentence in summary_sentences)
        return summarized
    except Exception as e:
        error = "Error : " + str(e)
        return error

if __name__ == "__main__":
    app.run(debug=True)
    # process()
    
