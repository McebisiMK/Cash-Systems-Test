﻿using DepositaCashOperations.Application.Common.Models;
using FluentValidation;
using FluentValidation.AspNetCore;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace DepositaCashOperations.Application.Common.Interceptors
{
    public class RequestValidatorInterceptor : IValidatorInterceptor
    {
        public ValidationResult AfterAspNetValidation(ActionContext actionContext, IValidationContext validationContext, ValidationResult validationResult)
        {
            var errors = validationResult.Errors
                            .Select(error => new ValidationFailure(error.PropertyName, Serialize(error)));

            return new ValidationResult(errors);
        }

        public IValidationContext BeforeAspNetValidation(ActionContext actionContext, IValidationContext validatorContext)
        {
            return validatorContext;
        }

        private static string Serialize(ValidationFailure failure)
        {
            return JsonSerializer.Serialize(new Error
            {
                Code = failure.ErrorCode,
                Message = failure.ErrorMessage
            });
        }
    }
}
