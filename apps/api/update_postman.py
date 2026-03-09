import json

with open('doctor_api_postman_collection.json', 'r') as f:
    data = json.load(f)

# Find the Auth folder
auth_folder = next((item for item in data['item'] if item['name'] == '🔐 Auth'), None)

if auth_folder:
    # Remove existing Auth items except Login and Refresh Token
    new_auth_items = []
    for item in auth_folder['item']:
        if item['name'] in ['Login (Doctor)', 'Refresh Token']:
            new_auth_items.append(item)
    
    # Add new Auth endpoints
    new_auth_items.extend([
        {
            "name": "Verify MFA (Doctor)",
            "request": {
                "method": "POST",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "url": "{{base_url}}/doctor/auth/login/mfa",
                "body": {"mode": "raw", "raw": "{\n  \"sessionToken\": \"{{session_token}}\",\n  \"code\": \"123456\"\n}"}
            }
        },
        {
            "name": "Get Current User",
            "request": {
                "method": "GET",
                "url": "{{base_url}}/doctor/auth/me"
            }
        },
        {
            "name": "Logout",
            "request": {
                "method": "POST",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "url": "{{base_url}}/doctor/auth/logout",
                "body": {"mode": "raw", "raw": "{\n  \"refreshToken\": \"{{refresh_token}}\"\n}"}
            }
        },
        {
            "name": "Logout All Sessions",
            "request": {
                "method": "POST",
                "url": "{{base_url}}/doctor/auth/logout/all-sessions"
            }
        },
        {
            "name": "Verify Session",
            "request": {
                "method": "GET",
                "url": "{{base_url}}/doctor/auth/session/verify"
            }
        },
        {
            "name": "Session Heartbeat",
            "request": {
                "method": "POST",
                "url": "{{base_url}}/doctor/auth/session/heartbeat"
            }
        }
    ])
    auth_folder['item'] = new_auth_items

# Create Security folder
security_folder = {
    "name": "🛡️ Security",
    "item": [
        {
            "name": "Initiate 2FA Setup",
            "request": {
                "method": "GET",
                "url": "{{base_url}}/doctor/security/2fa/setup"
            }
        },
        {
            "name": "Confirm 2FA",
            "request": {
                "method": "POST",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "url": "{{base_url}}/doctor/security/2fa/confirm",
                "body": {"mode": "raw", "raw": "{\n  \"secret\": \"BASE32SECRET\",\n  \"code\": \"123456\"\n}"}
            }
        },
        {
            "name": "Disable 2FA",
            "request": {
                "method": "POST",
                "url": "{{base_url}}/doctor/security/2fa/disable"
            }
        },
        {
            "name": "Get 2FA Status",
            "request": {
                "method": "GET",
                "url": "{{base_url}}/doctor/security/2fa/status"
            }
        },
        {
            "name": "Get My Sessions",
            "request": {
                "method": "GET",
                "url": "{{base_url}}/doctor/security/my-sessions"
            }
        },
        {
            "name": "Revoke Session",
            "request": {
                "method": "DELETE",
                "url": "{{base_url}}/doctor/security/sessions/{{session_id}}"
            }
        },
        {
            "name": "Revoke Other Sessions",
            "request": {
                "method": "DELETE",
                "url": "{{base_url}}/doctor/security/sessions/all-except-current"
            }
        },
        {
            "name": "Get My Devices",
            "request": {
                "method": "GET",
                "url": "{{base_url}}/doctor/security/my-devices"
            }
        },
        {
            "name": "Get Login History",
            "request": {
                "method": "GET",
                "url": "{{base_url}}/doctor/security/login-history"
            }
        },
        {
            "name": "Clear Login History",
            "request": {
                "method": "DELETE",
                "url": "{{base_url}}/doctor/security/login-history"
            }
        },
        {
            "name": "Change Password",
            "request": {
                "method": "POST",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "url": "{{base_url}}/doctor/security/change-password",
                "body": {"mode": "raw", "raw": "{\n  \"oldPassword\": \"current_password\",\n  \"newPassword\": \"new_password\"\n}"}
            }
        }
    ]
}

# Create Account folder
account_folder = {
    "name": "⚙️ Account",
    "item": [
        {
            "name": "Get Account Profile",
            "request": {
                "method": "GET",
                "url": "{{base_url}}/doctor/account/profile"
            }
        },
        {
            "name": "Update Account Profile",
            "request": {
                "method": "PUT",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "url": "{{base_url}}/doctor/account/profile",
                "body": {"mode": "raw", "raw": "{\n  \"firstName\": \"Doctor\",\n  \"lastName\": \"Name\",\n  \"phone\": \"+1234567890\"\n}"}
            }
        },
        {
            "name": "Change Account Password",
            "request": {
                "method": "POST",
                "header": [{"key": "Content-Type", "value": "application/json"}],
                "url": "{{base_url}}/doctor/account/password",
                "body": {"mode": "raw", "raw": "{\n  \"oldPassword\": \"old_pass\",\n  \"newPassword\": \"new_pass\"\n}"}
            }
        }
    ]
}

# Check if Security and Account folders exist
sec_idx = next((i for i, item in enumerate(data['item']) if item['name'] == '🛡️ Security'), -1)
acc_idx = next((i for i, item in enumerate(data['item']) if item['name'] == '⚙️ Account'), -1)

if sec_idx != -1:
    data['item'][sec_idx] = security_folder
else:
    data['item'].insert(1, security_folder)

if acc_idx != -1:
    data['item'][acc_idx] = account_folder
else:
    data['item'].insert(2, account_folder)

# add session_id variable if not exists
if not any(v['key'] == 'session_id' for v in data['variable']):
    data['variable'].append({"key": "session_id", "value": "", "type": "string"})
if not any(v['key'] == 'session_token' for v in data['variable']):
    data['variable'].append({"key": "session_token", "value": "", "type": "string"})

# Update the "Login (Doctor)" test script to capture sessionToken for MFA
for auth_item in auth_folder['item']:
    if auth_item['name'] == 'Login (Doctor)':
        if 'event' in auth_item and len(auth_item['event']) > 0:
            script = auth_item['event'][0]['script']['exec']
            if not any('sessionToken' in line for line in script):
                script.append("if (json.sessionToken) {")
                script.append("  pm.collectionVariables.set('session_token', json.sessionToken);")
                script.append("}")

with open('doctor_api_postman_collection.json', 'w') as f:
    json.dump(data, f, indent=4)

