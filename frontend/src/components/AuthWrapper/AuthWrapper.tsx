import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/graphql/generated/schema";
import { useDispatch } from "react-redux";
import { setMeData } from "@/redux/slices/meData";


interface EnrichedChildren {
  children?: React.ReactNode;
}function recursiveMap(
  children: React.ReactNode,
  fn: (child: React.ReactElement) => React.ReactElement<EnrichedChildren>
) {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement<EnrichedChildren>(child)) {
      return child;
    }

    let elementChild: React.ReactElement<EnrichedChildren> = child;

    if (child.props.children) {
      elementChild = React.cloneElement(elementChild, {
        children: recursiveMap(child.props.children, fn),
      });
    }

    if (typeof elementChild.type === "string") {
      return elementChild;
    }

    return fn(elementChild);
  });
}
export interface IAuth {
  children?: React.ReactNode;
  isPublic?: boolean;
}

const Auth: React.FunctionComponent<IAuth> = ({
  children = null,
  isPublic = false,
}: IAuth) => {
  const { data, loading, error } = useMeQuery({
    fetchPolicy: "network-only",
  });

  
  
  const router = useRouter();
  const dispatch = useDispatch();

  const authuser = data?.ME;

  useEffect(()=> {
    if(data) {
      if(data.ME?.errors) {
        router.push('/')
      }
    }
  }, [data, router])



  useEffect(() => {
    if (data) {
      dispatch(setMeData(data));
    }
  }, [data]);


  useEffect(() => {
    if(!loading) {
    if (error || !data?.ME) {
        router.push("/");
      }
    }
    }
  , [error, data, router]);



  if (loading) {
    return <p> Loading ...</p>;
  }

  if (error) {
    return <p>API error come back later, server likely does not responds</p>;
  }

  if (authuser) {
    // Add authUser prop to all child elements.
    const childrenWithProps = recursiveMap(children, (child) =>
      React.cloneElement(child, { authuser })
    );

    return <>{childrenWithProps}</>;
  }

  if (isPublic) { 
    return <>{children}</>;
  }

  return <>This page is authenticated you will be now redirected</>;
};

export default Auth;
