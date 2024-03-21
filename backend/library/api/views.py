import random

from django.db.models import Q
import json
from django.http import JsonResponse

from django.core.mail import send_mail

from backend.settings import EMAIL_HOST_USER

from django.core.exceptions import ValidationError


from django.contrib.sessions.models import Session

from rest_framework.pagination import PageNumberPagination

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from library.models import MyUser,Book
from django.contrib.auth.hashers import make_password
from django.shortcuts import redirect


from django.core.mail import BadHeaderError
from smtplib import SMTPException


# pdf 
from django.http import HttpResponse
from reportlab.lib import colors
from io import BytesIO

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table




from library.api.serializers import UserSerializer,BookSerializer


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh',
    ]
    return Response(routes)

@api_view(['POST'])
def signUp(request):
    if request.method == 'POST':
        name = request.data['name']
        username = request.data['username']
        email = request.data['email']
        password1 = request.data['password1']
        password2 = request.data['password2']
        # print(name,username,email,password1,"the value are Found!")
        if password1 != password2:
            return Response({'password': 'Password Not Matching!'}, status=status.HTTP_400_BAD_REQUEST)
        if MyUser.objects.filter(username = username):
            return Response({"username":'username not available'}, status=status.HTTP_401_UNAUTHORIZED)
        if MyUser.objects.filter(email = email):
            return Response({"email":"Already register with this email"},status=status.HTTP_406_NOT_ACCEPTABLE)
        data = {"name":name,"username":username,"email":email,"password1":password1}
        # Generate a random 5-digit number
        verification_code = ''.join(random.choices('0123456789', k=5))
        # Send verification email
        email_subject = 'Verify Your Email'
        email_message = f'Your verification code is: {verification_code}'

        # Set session data
        request.session['code'] = verification_code
        request.session['email'] = email
        request.session['data'] = data
        # request.session.save()
        
        # print(email_subject, email_message, EMAIL_HOST_USER, [email],"the data modelsssssssssssssssssssssssssssssssssss")
        try:

            # Flush all session data
            Session.objects.all().delete()
            send_mail(email_subject, email_message, EMAIL_HOST_USER, [email])
        except BadHeaderError:
            # Handle the case where the subject or message is not properly formatted
            return HttpResponse('Invalid header found.')
        except Exception as e:
            # Handle other exceptions, such as network issues or SMTP server errors
            return HttpResponse(f'An error occurred: {str(e)}')
        else:
            # Email sent successfully
            return HttpResponse('Email sent successfully!')
        
    

@api_view(['POST'])
def register_verify(request):
    if request.method == 'POST':
        otp = request.data['otp']
        # print(otp,"otp")

        active_sessions = Session.objects.all()
        data = {}
        for session in active_sessions:
            print(session.session_key, session.get_decoded(),"decininj")
            data[session.session_key] =  session.get_decoded()


        # Extracting values from the dictionary
        # session_id = list(data.keys())[0]  # Assuming there's only one key in the outer dictionary
        # inner_dict = data[session_id]
        # code = inner_dict['code']
        # email = inner_dict['email']
        # name = inner_dict['data']['name']
        # username = inner_dict['data']['username']
        # password = inner_dict['data']['password1']
            
        # Reverse the order of session keys
        session_ids = list(data.keys())

        # Assuming there's only one key in the outer dictionary after reversing
        if session_ids:
            session_id = session_ids[0]
            inner_dict = data[session_id]
            code = inner_dict['code']
            email = inner_dict['email']
            name = inner_dict['data']['name']
            username = inner_dict['data']['username']
            password = inner_dict['data']['password1']
        else:
            # Handle the case when there are no active sessions
            print("No active sessions found")

        # Printing the extracted values
        if otp == code:
            # try:
            new_user = MyUser.objects.create(
                username=username,
                email=email,
                password=make_password(password),
                first_name=name
            )
            Session.objects.all().delete()
            return Response({'status': 'success'})
        else:
            return Response({'error': 'Wrong OTP'}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
def get_user(request,id):
    user_ = MyUser.objects.get(user=id)
    serializer = UserSerializer(user_, many=False)
    return Response(serializer.data)


# @api_view(['GET'])
# def books_available(request):
#     books_ = Book.objects.all()
#     serializer = BookSerializer(books_, many=True)
#     return Response(serializer.data)


@api_view(['GET'])
def books_available(request):
    # Get the page number from the request query parameters, default to 1 if not provided
    page_number = int(request.query_params.get('page', 1))

    # Set the number of items per page
    items_per_page = 20

    # Get the queryset of all books
    books_queryset = Book.objects.all()

    # Create a paginator object
    paginator = PageNumberPagination()
    paginator.page_size = items_per_page

    # Paginate the queryset
    paginated_books = paginator.paginate_queryset(books_queryset, request)

    # Serialize the paginated queryset
    serializer = BookSerializer(paginated_books, many=True)

    # Return paginated response
    return paginator.get_paginated_response(serializer.data)


# @api_view(['GET'])
# def books_available(request):
#     books_ = Book.objects.all()

#     # Pagination
#     paginator = PageNumberPagination()
#     paginator.page_size = 20  # Set the page size to 20 books per page
#     result_page = paginator.paginate_queryset(books_, request)
    
#     # Serialize the paginated queryset
#     serializer = BookSerializer(result_page, many=True)
    
#     # Return paginated response
#     return paginator.get_paginated_response(serializer.data)


# @api_view(['POST'])
# def Filter(request):
#     if request.method == 'POST':
#         search_ = request.data.get('search')
#         books = Book.objects.filter(
#             Q(title__icontains=search_) |
#             Q(language__icontains=search_) |
#             Q(author__name__icontains=search_) | 
#             Q(subjects__name__icontains=search_) | 
#             Q(bookshelves__name__icontains=search_) |
#             Q(subjects__name__icontains=search_) |  
#             Q(bookshelves__name__icontains=search_) 
#         ).distinct() 
#         if not books:
#             return Response({"error": "No books found for the given search query."}, status=status.HTTP_404_NOT_FOUND)
#         serializer = BookSerializer(books, many=True)
#         return Response(serializer.data)

@api_view(['POST'])
def Filter(request):
    if request.method == 'POST':
        search_ = request.data.get('search')
        books = Book.objects.filter(
            Q(title__icontains=search_) |
            Q(language__icontains=search_) |
            Q(author__name__icontains=search_) | 
            Q(subjects__name__icontains=search_) | 
            Q(bookshelves__name__icontains=search_)
        ).distinct() 
        
        # Pagination
        paginator = PageNumberPagination()
        paginator.page_size = 20  # Number of books per page
        result_page = paginator.paginate_queryset(books, request)
        
        if not result_page:
            return Response({"error": "No books found for the given search query."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BookSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

# @api_view(['GET'])
# def pdf_Download(request,id):
#     book = Book.objects.get(id=id)
#     print(book,"giit ittt")
#     # Create a buffer to store PDF content
#     buffer = BytesIO()
#     # Create a PDF document
#     pdf = SimpleDocTemplate(buffer, pagesize=letter)
#     elements = []
#     # Add book details to the PDF document
#     elements.append(Paragraph(f"Title: {book.title}", style={'fontSize': 14, 'fontName': 'Helvetica-Bold'}))
#     elements.append(Paragraph(f"Author: {book.author.name}", style={'fontSize': 12}))
#     elements.append(Paragraph(f"Language: {book.language}", style={'fontSize': 12}))
#     elements.append(Paragraph(f"Subjects: {', '.join([subject.name for subject in book.subjects.all()])}", style={'fontSize': 12}))
#     elements.append(Paragraph(f"Genre: {book.genre}", style={'fontSize': 12}))
#     # Build the PDF document
#     pdf.build(elements)
#     # Get the PDF content from the buffer
#     pdf_content = buffer.getvalue()
#     buffer.close()
#     # Create an HTTP response with PDF content
#     response = HttpResponse(content_type='application/pdf')
#     response['Content-Disposition'] = f'attachment; filename="{book.title}.pdf"'
#     response.write(pdf_content)
#     return response

@api_view(['GET'])
def pdf_Download(request, id):
    # print("Enterss")
    try:
        book = Book.objects.get(id=id)
    except Book.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    elements = []
    elements.append(Paragraph(f"Title: {str(book.title)}", style={'fontSize': 14, 'fontName': 'Helvetica-Bold'}))

    elements.append(Paragraph(f"Author: {book.author.name}", style={'fontSize': 12}))
    # Add other book details as needed

    buffer = BytesIO()
    pdf = SimpleDocTemplate(buffer, pagesize=letter)
    pdf.build(elements)

    # Get the PDF content from the buffer
    pdf_content = buffer.getvalue()
    buffer.close()

    # Return PDF as response
    response = HttpResponse(pdf_content, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{book.title}.pdf"'
    return response
    
    
