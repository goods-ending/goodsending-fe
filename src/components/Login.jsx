import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getLoginToken, getUserInfo } from "@/api/userApi";
import { useDispatch } from "react-redux";
import { setToken, setUserData } from "@/redux/modules/auth";

function Login({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 가입메일
  const [password, setPassword] = useState(""); // 가입메일
  const goToSignUp = () => {
    navigate("/signup");
    onClose();
  };

  const submitLogin = async () => {
    const requestBody = {
      email,
      password,
    };
    try {
      const token = await getLoginToken(requestBody);
      dispatch(setToken(token));
      callUserInfo(token);
      onClose();
    } catch (error) {
      // 에러 처리
      console.log(error);
    }
  };

  const callUserInfo = async (token) => {
    try {
      const userData = await getUserInfo(token);
      dispatch(setUserData(userData.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle />
      <DialogContent className="bg-white w-1/4 flex flex-col items-center">
        <img src="../icon/LogoBlue.png" alt="logo" className="h-14 mb-5" />
        <Input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="bg-primary w-full" onClick={submitLogin}>
          <LogIn className="mr-2 h-4 w-4" />
          로그인
        </Button>
        <div className="flex">
          {/* <p className="text-sm">아이디(이메일)찾기</p>
          <p className="text-sm ml-3 mr-3"> | </p>
          <p className="text-sm">비밀번호 찾기</p>
          <p className="text-sm ml-3 mr-3"> | </p> */}
          <p className="text-sm ">아직 회원이 아니신가요 ? </p>
          <p
            className="ml-2 text-sm underline decoration-primary decoration-wavy decoration-2 underline-offset-4 cursor-pointer"
            onClick={goToSignUp}
          >
            회원가입
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
