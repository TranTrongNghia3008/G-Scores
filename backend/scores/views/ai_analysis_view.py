from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google import genai
import re

GEMINI_API_KEY="AIzaSyCuiwADRucqTqFmdE_GE3TRPGSCwMQ13-M"

class AIAnalysisView(APIView):
    def post(self, request):
        try:
            report = request.data.get("report")
            if not report:
                return Response({"error": "Missing report data"}, status=400)

            prompt = f"""
                You are a data analyst. Given the following exam score distribution report by subject and score levels:

                {report}

                Please analyze this data and provide key insights as HTML. Highlight trends, surprising patterns, or anything worth noting.

                Respond only in HTML format. Use tags like <h2>, <ul>, <li>, <strong>, <p>, etc. for structure.
                
                Return only the content in the body tag according to the rule
                <body>Your answer content</boby>
                """

            client = genai.Client(api_key=GEMINI_API_KEY)

            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[prompt]
            )
            
            def clean_html(raw):
                cleaned = re.sub(r"^```html\s*|```$", "", raw.strip())
                return cleaned

            html = clean_html(response.text)

            return Response({"html": html})

        except Exception as e:
            return Response({"error": str(e)}, status=500)
