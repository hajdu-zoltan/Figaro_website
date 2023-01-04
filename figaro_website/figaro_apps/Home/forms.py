from django.forms import *
from captcha.fields import ReCaptchaField
from captcha.widgets import ReCaptchaV2Invisible

class Myform(forms.Form):
    captcha = ReCaptchaField(widget=ReCaptchaV2Invisible)
