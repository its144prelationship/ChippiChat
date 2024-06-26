import { useEffect, useState } from "react";
import CancelButton from "../../../common/components/Button/CancelButton/CancelButton";
import ConfirmButton from "../../../common/components/Button/ConfirmButton/ConfirmButton";
import InputText from "../../../common/components/Input/InputText";
import ProfilePic from "./ProfilePic";
import ConfirmModal from "./ConfirmModal";
import PicChooser from "../../../common/components/PicChooser/PicChooser";
import { RegisterService } from "../services/RegisterService";
import { RegisterSchema, UpdateUserSchema } from "../types/RegisterType";

export type FormType = "CREATE" | "UPDATE";
export interface OriInfo {
  username: string;
  profile_picture: string;
  user_id: string;
}

export default function InputForm({
  formType,
  oriInfo,
  onClose,
}: {
  formType: FormType;
  oriInfo?: OriInfo;
  onClose?: () => void;
}) {
  const [username, setUsername] = useState(oriInfo ? oriInfo.username : "");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [profilePic, setProfilePic] = useState(
    oriInfo ? oriInfo.profile_picture : "1"
  );
  const [isPicChooserOpen, setIsPicChooserOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [validUsername, setValidUsername] = useState(0); //0 = valid 1 = "" 2 = already exist
  const [validPassword, setValidPassword] = useState(true);
  const tempPassword = "*".repeat(password.length);
  const tempPassword2 = "*".repeat(password2.length);
  const pics: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  useEffect(() => {
    if (oriInfo) {
      setUsername(oriInfo.username);
      setProfilePic(oriInfo.profile_picture);
    }
  }, [oriInfo]);

  const onChangePassword = (value: string, mode: string) => {
    let tmppass;
    if (mode == "1") {
      tmppass = password;
      if (value !== "") {
        setValidPassword(true);
      }
    } else {
      tmppass = password2;
    }
    if (value.length > tmppass.length) {
      if (mode === "1") {
        setPassword(tmppass + value[value.length - 1]);
      } else {
        setPassword2(tmppass + value[value.length - 1]);
      }
    } else if (value.length < tmppass.length) {
      if (mode === "1") {
        setPassword(tmppass.slice(0, tmppass.length - 1));
      } else {
        setPassword2(tmppass.slice(0, tmppass.length - 1));
      }
    }
  };

  const register = async () => {
    const registerInfo: RegisterSchema = {
      username: username,
      password: password,
      profile_picture: profilePic,
    };
    return await RegisterService.createUser(registerInfo);
  };

  const editProfile = async () => {
    const updateUserInfo: UpdateUserSchema = {
      username: username,
      profile_picture: profilePic,
    };
    const user_id = oriInfo ? oriInfo.user_id : "";
    return await RegisterService.updateUser(updateUserInfo, user_id);
  };

  return (
    <div className="flex flex-col w-fit">
      <div className="flex flex-row items-center space-x-24 mt-8">
        <div className="flex flex-col gap-12 mt-2 font-dm-mono justify-items-end items-end">
          <div className="w-[570px] flex flex-col justify-items-end items-end space-y-1">
            <InputText
              label="Username"
              valid={validUsername === 0 ? true : false}
              placeholder="Enter Your Username"
              spellCheck={false}
              value={username}
              handleOnChange={(value) => setUsername(value)}
            />
            {validUsername === 1 ? (
              <div className="text-center text-cpc-red font-light text-xl">
                Please enter your username
              </div>
            ) : validUsername === 2 ? (
              <div className="text-center text-cpc-red font-light text-lg">
                This username is already taken !
              </div>
            ) : null}
          </div>
          {formType === "CREATE" ? (
            <InputText
              label="Password"
              valid={validPassword}
              placeholder="Enter Your Password"
              spellCheck={false}
              value={tempPassword}
              handleOnChange={(value) => {
                onChangePassword(value, "1");
              }}
            />
          ) : null}

          {formType === "CREATE" ? (
            <div className="w-[700px] flex flex-col justify-items-end items-end space-y-1">
              <InputText
                label="Re-Enter Password"
                valid={validPassword}
                placeholder="Re-enter Your Password"
                spellCheck={false}
                value={tempPassword2}
                handleOnChange={(value) => {
                  onChangePassword(value, "2");
                }}
              />
              {validPassword === false ? (
                password === "" ? (
                  <div className="text-center text-cpc-red font-light text-xl">
                    Please enter your password
                  </div>
                ) : (
                  <div className="text-center text-cpc-red font-light text-xl">
                    Password do not match !
                  </div>
                )
              ) : null}
            </div>
          ) : null}
        </div>
        <ProfilePic
          pic={profilePic}
          setModal={() => {
            setIsPicChooserOpen(true);
          }}
        />
      </div>
      <div className="w-fit flex flex-row space-x-10 self-end justify-items-end mt-8">
        <CancelButton
          onCancel={() => {
            if (formType === "UPDATE" && onClose) {
              setProfilePic(oriInfo ? oriInfo.profile_picture : "1");
              setUsername(oriInfo ? oriInfo.username : "");
              setValidUsername(0);
              onClose();
            } else {
              window.location.href = "http://localhost:5173/login";
            }
          }}
        />
        <ConfirmButton
          onConfirm={async () => {
            try {
              if (username === "") {
                setValidUsername(1);
              } else {
                const valid = await RegisterService.validateUsername(username);
                if (valid || username === oriInfo?.username) {
                  if (
                    formType === "CREATE" &&
                    (password === "" || password !== password2)
                  ) {
                    setValidPassword(false);
                    setValidUsername(0);
                  } else {
                    setValidPassword(true);
                    setValidUsername(0);
                    setIsConfirmOpen(true);
                  }
                } else {
                  setValidUsername(2);
                }
              }
            } catch (error) {
              console.error("Error validating username:", error);
            }
          }}
        />
      </div>
      <PicChooser
        title="Choose Your Favorite"
        pics={pics}
        isVisible={isPicChooserOpen}
        onClose={() => {
          setIsPicChooserOpen(false);
        }}
        onChange={(value) => {
          setProfilePic(value);
          setIsPicChooserOpen(false);
        }}
      />
      <ConfirmModal
        isVisible={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
        }}
        onConfirm={async () => {
          if (formType === "CREATE") {
            const success = await register();
            if (success) {
              setIsConfirmOpen(false);
              window.location.href = "http://localhost:5173/login";
            } else {
              setIsConfirmOpen(false);
              alert("Cannot Create User");
            }
          } else {
            const response = await editProfile();
            if (response) {
              window.location.reload();
            } else {
              alert("Cannot Update User");
              setIsConfirmOpen(false);
              if (onClose) {
                onClose();
              }
            }
          }
        }}
        type={formType}
      />
    </div>
  );
}
